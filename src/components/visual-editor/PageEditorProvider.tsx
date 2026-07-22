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
  collectEditablePageFields,
  setPageField,
} from "@/lib/cms-page-content";
import {
  addSectionToDocument,
  documentToInteriorPage,
  interiorPageToDocument,
  isAddableSectionKind,
  isPageStructureLocked,
  removeSectionFromDocument,
  reorderSectionsInDocument,
  type AddableSectionKind,
  type IdentifiedPageSection,
  type PageDocument,
} from "@/lib/cms-page-document";
import type { InteriorPage } from "@/lib/pages";

type PageEditorContextValue = {
  canEdit: boolean;
  editMode: boolean;
  dirty: boolean;
  saving: boolean;
  status: string | null;
  routeSlug: string;
  page: InteriorPage;
  document: PageDocument;
  structureEditable: boolean;
  setEditMode: (value: boolean) => void;
  setField: (path: string, value: string) => void;
  addSection: (kind: AddableSectionKind, afterIndex?: number) => void;
  removeSection: (index: number) => void;
  moveSection: (from: number, to: number) => void;
  save: () => Promise<void>;
  publish: () => Promise<void>;
};

const PageEditorContext = createContext<PageEditorContextValue | null>(null);

export function usePageEditorOptional() {
  return useContext(PageEditorContext);
}

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
      page: {
        slug: "",
        title: "",
        intro: "",
        sections: [],
      } satisfies InteriorPage,
      document: {
        schemaVersion: 1,
        title: "",
        intro: "",
        sections: [],
      } satisfies PageDocument,
      structureEditable: false,
      setEditMode: () => undefined,
      setField: () => undefined,
      addSection: () => undefined,
      removeSection: () => undefined,
      moveSection: () => undefined,
      save: async () => undefined,
      publish: async () => undefined,
    };
  }
  return value;
}

function pageFromState(
  base: InteriorPage,
  document: PageDocument,
): InteriorPage {
  return documentToInteriorPage(document, base.slug, {
    heroVideo: base.heroVideo,
    heroVideoPoster: base.heroVideoPoster,
  });
}

function preserveSectionIds(
  previous: IdentifiedPageSection[],
  nextPage: InteriorPage,
): IdentifiedPageSection[] {
  if (previous.length === nextPage.sections.length) {
    return nextPage.sections.map((section, index) => ({
      ...section,
      id: previous[index]?.id ?? `sec-${index}-${section.kind}`,
    }));
  }
  return nextPage.sections.map((section, index) => ({
    ...section,
    id: previous[index]?.id ?? `sec-${index}-${section.kind}`,
  }));
}

export function PageEditorProvider({
  canEdit,
  initialPage,
  initialDocument,
  initialFields,
  initialEditMode = false,
  children,
}: {
  canEdit: boolean;
  initialPage: InteriorPage;
  initialDocument?: PageDocument;
  initialFields?: Record<string, string>;
  initialEditMode?: boolean;
  children: ReactNode;
}) {
  const site = useSiteCmsOptional();
  const [localEditMode, setLocalEditMode] = useState(
    Boolean(canEdit && initialEditMode),
  );
  const routeSlug = initialPage.slug;
  const canStructureEdit = canEdit && !isPageStructureLocked(initialPage);

  const [document, setDocument] = useState<PageDocument>(
    () => initialDocument ?? interiorPageToDocument(initialPage),
  );
  const documentRef = useRef(document);
  documentRef.current = document;

  const [page, setPage] = useState<InteriorPage>(() =>
    pageFromState(initialPage, document),
  );
  const pageRef = useRef(page);
  pageRef.current = page;

  const [fields, setFields] = useState<Record<string, string>>(() => ({
    ...collectEditablePageFields(page),
    ...(initialFields ?? {}),
  }));
  const fieldsRef = useRef(fields);
  fieldsRef.current = fields;

  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const editMode = site ? site.editMode : Boolean(canEdit && localEditMode);
  const setEditMode = site ? site.setEditMode : setLocalEditMode;

  const syncFromDocument = useCallback(
    (nextDocument: PageDocument, markDirty: boolean) => {
      const nextPage = pageFromState(initialPage, nextDocument);
      documentRef.current = nextDocument;
      pageRef.current = nextPage;
      setDocument(nextDocument);
      setPage(nextPage);
      const nextFields = collectEditablePageFields(nextPage);
      fieldsRef.current = nextFields;
      setFields(nextFields);
      if (markDirty) {
        setDirty(true);
        setStatus("Unsaved changes");
      }
    },
    [initialPage],
  );

  const setField = useCallback(
    (path: string, value: string) => {
      const nextPage = setPageField(pageRef.current, path, value);
      const nextDocument: PageDocument = {
        ...documentRef.current,
        title: nextPage.title,
        ...(nextPage.eyebrow ? { eyebrow: nextPage.eyebrow } : {}),
        intro: nextPage.intro,
        ...(nextPage.image ? { image: nextPage.image } : {}),
        ...(nextPage.imageAlt ? { imageAlt: nextPage.imageAlt } : {}),
        ...(nextPage.ctas?.length ? { ctas: nextPage.ctas } : {}),
        sections: preserveSectionIds(
          documentRef.current.sections,
          nextPage,
        ),
      };
      documentRef.current = nextDocument;
      pageRef.current = nextPage;
      setDocument(nextDocument);
      setPage(nextPage);
      setFields((current) => {
        const next = { ...current, [path]: value };
        // Rebuild gallery list fields when list path updates.
        if (path.includes(".__list__") || path.startsWith("sections.")) {
          const rebuilt = {
            ...collectEditablePageFields(nextPage),
            [path]: value,
          };
          fieldsRef.current = rebuilt;
          return rebuilt;
        }
        fieldsRef.current = next;
        return next;
      });
      setDirty(true);
      setStatus("Unsaved changes");
    },
    [],
  );

  const addSection = useCallback(
    (kind: AddableSectionKind, afterIndex?: number) => {
      if (!canStructureEdit || !isAddableSectionKind(kind)) return;
      const next = addSectionToDocument(
        documentRef.current,
        kind,
        afterIndex,
      );
      syncFromDocument(next, true);
    },
    [canStructureEdit, syncFromDocument],
  );

  const removeSection = useCallback(
    (index: number) => {
      if (!canStructureEdit) return;
      const next = removeSectionFromDocument(documentRef.current, index);
      syncFromDocument(next, true);
    },
    [canStructureEdit, syncFromDocument],
  );

  const moveSection = useCallback(
    (from: number, to: number) => {
      if (!canStructureEdit) return;
      const next = reorderSectionsInDocument(documentRef.current, from, to);
      syncFromDocument(next, true);
    },
    [canStructureEdit, syncFromDocument],
  );

  const persistContent = useCallback(async () => {
    setStatus("Saving draft…");
    const response = await fetch("/api/cms/pages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        routeSlug,
        document: documentRef.current,
        action: "save",
      }),
    });
    const payload = (await response.json()) as {
      document?: PageDocument;
      error?: string;
    };
    if (response.status === 401) {
      throw new Error("Sign in required. Open /cms/login/ and try again.");
    }
    if (!response.ok || !payload.document) {
      throw new Error(payload.error || "Save failed.");
    }
    syncFromDocument(payload.document, false);
    setDirty(false);
    setStatus("Draft saved");
  }, [routeSlug, syncFromDocument]);

  const publishContent = useCallback(async () => {
    setStatus("Publishing…");
    const response = await fetch("/api/cms/pages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        routeSlug,
        document: documentRef.current,
        action: "publish",
      }),
    });
    const payload = (await response.json()) as {
      document?: PageDocument;
      error?: string;
    };
    if (response.status === 401) {
      throw new Error("Sign in required. Open /cms/login/ and try again.");
    }
    if (!response.ok || !payload.document) {
      throw new Error(payload.error || "Publish failed.");
    }
    syncFromDocument(payload.document, false);
    setDirty(false);
    setStatus("Published");
  }, [routeSlug, syncFromDocument]);

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

  const publish = useCallback(async () => {
    setSaving(true);
    try {
      await publishContent();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Publish failed.");
      throw error;
    } finally {
      setSaving(false);
    }
  }, [publishContent]);

  const setSiteEditMode = site?.setEditMode;
  useEffect(() => {
    if (canEdit && initialEditMode && setSiteEditMode) {
      setSiteEditMode(true);
    }
  }, [canEdit, initialEditMode, setSiteEditMode]);

  const previewHref = routeSlug ? `/${routeSlug}/?preview=1` : null;

  const registration = useMemo<ContentEditorRegistration>(
    () => ({
      dirty,
      saving,
      status,
      save,
      publish,
      previewHref,
    }),
    [dirty, saving, status, save, publish, previewHref],
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
      page,
      document,
      structureEditable: canStructureEdit && canEdit && editMode,
      setEditMode,
      setField,
      addSection,
      removeSection,
      moveSection,
      save,
      publish,
    }),
    [
      canEdit,
      editMode,
      dirty,
      saving,
      status,
      routeSlug,
      page,
      document,
      canStructureEdit,
      setEditMode,
      setField,
      addSection,
      removeSection,
      moveSection,
      save,
      publish,
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

/** Prefer live editor page when mounted under PageEditorProvider. */
export function useLiveInteriorPage(fallback: InteriorPage): InteriorPage {
  const editor = usePageEditorOptional();
  return editor?.page ?? fallback;
}
