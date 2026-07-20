"use client";

import { createContext, useContext, type ReactNode } from "react";

type CmsEditableContextValue = {
  editMode: boolean;
  fields: Record<string, string>;
  setField: (path: string, value: string) => void;
  resolveValue: (path: string, fallback: string) => string;
};

const CmsEditableContext = createContext<CmsEditableContextValue>({
  editMode: false,
  fields: {},
  setField: () => undefined,
  resolveValue: (_path, fallback) => fallback,
});

export function CmsEditableProvider({
  editMode,
  fields = {},
  setField,
  children,
}: {
  editMode: boolean;
  fields?: Record<string, string>;
  setField: (path: string, value: string) => void;
  children: ReactNode;
}) {
  const resolveValue = (path: string, fallback: string) =>
    Object.prototype.hasOwnProperty.call(fields, path)
      ? fields[path]
      : fallback;

  return (
    <CmsEditableContext.Provider
      value={{ editMode, fields, setField, resolveValue }}
    >
      {children}
    </CmsEditableContext.Provider>
  );
}

export function useCmsEditable() {
  return useContext(CmsEditableContext);
}
