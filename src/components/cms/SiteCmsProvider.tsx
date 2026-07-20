"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_IMAGE_SCALE,
  DEFAULT_OBJECT_POSITION,
} from "@/lib/cms-homepage";
import type {
  CmsImageOverride,
  CmsImageOverrides,
} from "@/lib/cms-image-overrides";

export type ContentEditorRegistration = {
  dirty: boolean;
  saving: boolean;
  status: string | null;
  save: () => Promise<void>;
};

type SiteCmsContextValue = {
  canEdit: boolean;
  editMode: boolean;
  dirty: boolean;
  saving: boolean;
  status: string | null;
  email: string | null;
  overrides: CmsImageOverrides;
  setEditMode: (value: boolean) => void;
  setOverride: (key: string, patch: Partial<CmsImageOverride>) => void;
  resetOverride: (key: string) => void;
  uploadMedia: (file: File) => Promise<string>;
  save: () => Promise<void>;
  registerContentEditor: (editor: ContentEditorRegistration | null) => void;
};

const SiteCmsContext = createContext<SiteCmsContextValue | null>(null);

export function useSiteCms() {
  const value = useContext(SiteCmsContext);
  if (!value) {
    return {
      canEdit: false,
      editMode: false,
      dirty: false,
      saving: false,
      status: null,
      email: null,
      overrides: {},
      setEditMode: () => undefined,
      setOverride: () => undefined,
      resetOverride: () => undefined,
      uploadMedia: async () => "",
      save: async () => undefined,
      registerContentEditor: () => undefined,
    } satisfies SiteCmsContextValue;
  }
  return value;
}

export function useSiteCmsOptional() {
  return useContext(SiteCmsContext);
}

export function SiteCmsProvider({
  canEdit,
  email,
  initialOverrides,
  initialEditMode = false,
  children,
}: {
  canEdit: boolean;
  email: string | null;
  initialOverrides: CmsImageOverrides;
  initialEditMode?: boolean;
  children: ReactNode;
}) {
  const [editMode, setEditMode] = useState(Boolean(canEdit && initialEditMode));
  const [overrides, setOverrides] = useState(initialOverrides);
  const overridesRef = useRef(overrides);
  overridesRef.current = overrides;
  const [overridesDirty, setOverridesDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [contentEditor, setContentEditor] =
    useState<ContentEditorRegistration | null>(null);
  const contentEditorRef = useRef(contentEditor);
  contentEditorRef.current = contentEditor;

  const registerContentEditor = useCallback(
    (editor: ContentEditorRegistration | null) => {
      setContentEditor(editor);
    },
    [],
  );

  const setOverride = useCallback(
    (key: string, patch: Partial<CmsImageOverride>) => {
      setOverrides((current) => {
        const prev = current[key] ?? {
          objectPosition: DEFAULT_OBJECT_POSITION,
          imageScale: DEFAULT_IMAGE_SCALE,
        };
        const next = {
          ...current,
          [key]: {
            ...prev,
            ...patch,
          },
        };
        overridesRef.current = next;
        return next;
      });
      setOverridesDirty(true);
      setStatus("Unsaved changes");
    },
    [],
  );

  const resetOverride = useCallback((key: string) => {
    setOverrides((current) => {
      const next = { ...current };
      delete next[key];
      overridesRef.current = next;
      return next;
    });
    setOverridesDirty(true);
    setStatus("Unsaved changes");
  }, []);

  const uploadMedia = useCallback(async (file: File) => {
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
  }, []);

  const persistOverrides = useCallback(async () => {
    setStatus("Saving…");
    const response = await fetch("/api/cms/image-overrides/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ overrides: overridesRef.current }),
    });
    const payload = (await response.json()) as {
      overrides?: CmsImageOverrides;
      error?: string;
    };
    if (response.status === 401) {
      throw new Error("Sign in required. Open /cms/login/ and try again.");
    }
    if (!response.ok || !payload.overrides) {
      throw new Error(payload.error || "Save failed.");
    }
    overridesRef.current = payload.overrides;
    setOverrides(payload.overrides);
    setOverridesDirty(false);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      if (overridesDirty) {
        await persistOverrides();
      }
      const editor = contentEditorRef.current;
      if (editor?.dirty) {
        await editor.save();
      }
      setStatus("Saved");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }, [overridesDirty, persistOverrides]);

  const dirty = overridesDirty || Boolean(contentEditor?.dirty);
  const combinedSaving = saving || Boolean(contentEditor?.saving);
  const combinedStatus = contentEditor?.status || status;

  const value = useMemo(
    () => ({
      canEdit,
      editMode: canEdit && editMode,
      dirty,
      saving: combinedSaving,
      status: combinedStatus,
      email,
      overrides,
      setEditMode,
      setOverride,
      resetOverride,
      uploadMedia,
      save,
      registerContentEditor,
    }),
    [
      canEdit,
      editMode,
      dirty,
      combinedSaving,
      combinedStatus,
      email,
      overrides,
      setOverride,
      resetOverride,
      uploadMedia,
      save,
      registerContentEditor,
    ],
  );

  return (
    <SiteCmsContext.Provider value={value}>{children}</SiteCmsContext.Provider>
  );
}
