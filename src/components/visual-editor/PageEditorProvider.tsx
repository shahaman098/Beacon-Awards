"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  useSiteCmsOptional,
  type ContentEditorRegistration,
} from "@/components/cms/SiteCmsProvider";
import { CmsEditableProvider } from "@/components/visual-editor/CmsEditableContext";
import { collectEditablePageFields } from "@/lib/cms-page-content";
import type { InteriorPage } from "@/lib/pages";

type PageEditorContextValue = {
  canEdit: boolean;
  editMode: boolean;
  dirty: boolean;
  saving: boolean;
  status: string | null;
  routeSlug: string;
  setEditMode: (value: boolean) => void;
  setField: (path: string, value: string) => void;
  save: () => Promise<void>;
};

const PageEditorContext = createContext<PageEditorContextValue | null>(null);

export function usePageEditor() {
  const value = useContext(PageEditorContext);
  if (!value) {
    return {
      canEdit: false,
      editMode: false,
      dirty: false,
      saving: false,
      status: null,
      routeSlug: "",
      setEditMode: () => undefined,
      setField: () => undefined,
      save: async () => undefined,
    };
  }
  return value;
}

export function PageEditorProvider({
  canEdit,
  initialPage,
  initialFields,
  initialEditMode = false,
  children,
}: {
  canEdit: boolean;
  initialPage: InteriorPage;
  initialFields?: Record<string, string>;
  initialEditMode?: boolean;
  children: ReactNode;
}) {
  const site = useSiteCmsOptional();
  const [localEditMode, setLocalEditMode] = useState(
    Boolean(canEdit && initialEditMode),
  );
  const routeSlug = initialPage.slug;
  const [fields, setFields] = useState<Record<string, string>>(() => ({
    ...collectEditablePageFields(initialPage),
    ...(initialFields ?? {}),
  }));
  const fieldsRef = useRef(fields);
  fieldsRef.current = fields;
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const editMode = site ? site.editMode : Boolean(canEdit && localEditMode);
  const setEditMode = site ? site.setEditMode : setLocalEditMode;

  const setField = useCallback((path: string, value: string) => {
    setFields((current) => {
      const next = { ...current, [path]: value };
      fieldsRef.current = next;
      return next;
    });
    setDirty(true);
    setStatus("Unsaved changes");
  }, []);

  const persistContent = useCallback(async () => {
    setStatus("Saving…");
    const response = await fetch("/api/cms/pages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        routeSlug,
        fields: fieldsRef.current,
      }),
    });
    const payload = (await response.json()) as {
      content?: { fields?: Record<string, string> };
      error?: string;
    };
    if (response.status === 401) {
      throw new Error("Sign in required. Open /cms/login/ and try again.");
    }
    if (!response.ok || !payload.content) {
      throw new Error(payload.error || "Save failed.");
    }
    fieldsRef.current = payload.content.fields ?? fieldsRef.current;
    setFields(fieldsRef.current);
    setDirty(false);
    setStatus("Saved");
  }, [routeSlug]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await persistContent();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
      throw error;
    } finally {
      setSaving(false);
    }
  }, [persistContent]);

  const registration = useMemo<ContentEditorRegistration>(
    () => ({
      dirty,
      saving,
      status,
      save,
    }),
    [dirty, saving, status, save],
  );

  const registerContentEditor = site?.registerContentEditor;
  useEffect(() => {
    if (!registerContentEditor) return;
    registerContentEditor(registration);
    return () => registerContentEditor(null);
  }, [registerContentEditor, registration]);

  const value = useMemo(
    () => ({
      canEdit,
      editMode: canEdit && editMode,
      dirty,
      saving,
      status,
      routeSlug,
      setEditMode,
      setField,
      save,
    }),
    [
      canEdit,
      editMode,
      dirty,
      saving,
      status,
      routeSlug,
      setEditMode,
      setField,
      save,
    ],
  );

  return (
    <PageEditorContext.Provider value={value}>
      <CmsEditableProvider
        editMode={canEdit && editMode}
        fields={fields}
        setField={setField}
      >
        {children}
      </CmsEditableProvider>
    </PageEditorContext.Provider>
  );
}
