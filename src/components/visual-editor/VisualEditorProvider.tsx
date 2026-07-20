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
import {
  setHomepageField,
  type HomepageContent,
} from "@/lib/cms-homepage";

type VisualEditorContextValue = {
  canEdit: boolean;
  editMode: boolean;
  dirty: boolean;
  saving: boolean;
  status: string | null;
  content: HomepageContent;
  setEditMode: (value: boolean) => void;
  setField: (path: string, value: string) => void;
  save: () => Promise<void>;
  saveField: (path: string, value: string) => Promise<void>;
  uploadMedia: (file: File) => Promise<string>;
};

const VisualEditorContext = createContext<VisualEditorContextValue | null>(
  null,
);

export function useVisualEditor() {
  const value = useContext(VisualEditorContext);
  if (!value) {
    return {
      canEdit: false,
      editMode: false,
      dirty: false,
      saving: false,
      status: null,
      content: null as HomepageContent | null,
      setEditMode: () => undefined,
      setField: () => undefined,
      save: async () => undefined,
      saveField: async () => undefined,
      uploadMedia: async () => "",
    };
  }
  return value;
}

export function VisualEditorProvider({
  canEdit,
  initialContent,
  initialEditMode = false,
  children,
}: {
  canEdit: boolean;
  initialContent: HomepageContent;
  initialEditMode?: boolean;
  children: ReactNode;
}) {
  const site = useSiteCmsOptional();
  const [localEditMode, setLocalEditMode] = useState(
    Boolean(canEdit && initialEditMode),
  );
  const [content, setContent] = useState(initialContent);
  const contentRef = useRef(content);
  contentRef.current = content;
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const editMode = site
    ? site.editMode
    : Boolean(canEdit && localEditMode);
  const setEditMode = site ? site.setEditMode : setLocalEditMode;

  const setField = useCallback((path: string, value: string) => {
    setContent((current) => {
      const next = setHomepageField(current, path, value);
      contentRef.current = next;
      return next;
    });
    setDirty(true);
    setStatus("Unsaved changes");
  }, []);

  const uploadMedia = useCallback(async (file: File) => {
    if (site) {
      return site.uploadMedia(file);
    }
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/cms/media/upload/", {
      method: "POST",
      body,
      credentials: "include",
    });
    const payload = (await response.json()) as { url?: string; error?: string };
    if (response.status === 401) {
      throw new Error("Sign in required. Open /cms/login/ and try again.");
    }
    if (!response.ok || !payload.url) {
      throw new Error(payload.error || "Upload failed.");
    }
    return payload.url;
  }, [site]);

  const persistContent = useCallback(async (nextContent: HomepageContent) => {
    setStatus("Saving…");
    const response = await fetch("/api/cms/homepage/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: nextContent }),
    });
    const payload = (await response.json()) as {
      content?: HomepageContent;
      error?: string;
    };
    if (response.status === 401) {
      throw new Error("Sign in required. Open /cms/login/ and try again.");
    }
    if (!response.ok || !payload.content) {
      throw new Error(payload.error || "Save failed.");
    }
    contentRef.current = payload.content;
    setContent(payload.content);
    setDirty(false);
    setStatus("Saved");
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await persistContent(contentRef.current);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
      throw error;
    } finally {
      setSaving(false);
    }
  }, [persistContent]);

  const saveField = useCallback(
    async (path: string, value: string) => {
      const next = setHomepageField(contentRef.current, path, value);
      contentRef.current = next;
      setContent(next);
      setDirty(true);
      setSaving(true);
      try {
        await persistContent(next);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Save failed.");
      } finally {
        setSaving(false);
      }
    },
    [persistContent],
  );

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
      content,
      setEditMode,
      setField,
      save,
      saveField,
      uploadMedia,
    }),
    [
      canEdit,
      editMode,
      dirty,
      saving,
      status,
      content,
      setEditMode,
      setField,
      save,
      saveField,
      uploadMedia,
    ],
  );

  return (
    <VisualEditorContext.Provider value={value}>
      <CmsEditableProvider editMode={canEdit && editMode} setField={setField}>
        {children}
      </CmsEditableProvider>
    </VisualEditorContext.Provider>
  );
}
