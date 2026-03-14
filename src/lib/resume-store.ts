"use client";

import { create } from "zustand";
import type { ResumeData } from "@types/resume";
import { defaultResumeData } from "@types/resume";
import { updateResume } from "@/lib/api";

export interface ResumeStore {
  id: string | null;
  title: string;
  templateId: string;
  data: ResumeData;
  saving: boolean;
  setResume: (r: {
    id: string;
    title: string;
    templateId: string;
    data: ResumeData;
  }) => void;
  updateData: (patch: Partial<ResumeData>) => void;
  updateTitle: (title: string) => void;
  setTemplate: (templateId: string) => void;
}

let saveTimer: ReturnType<typeof setTimeout>;

function scheduleSave(
  set: (fn: (s: ResumeStore) => Partial<ResumeStore>) => void,
  get: () => ResumeStore
) {
  clearTimeout(saveTimer);
  set(() => ({ saving: true }));
  saveTimer = setTimeout(async () => {
    const { id, title, templateId, data } = get();
    if (!id) {
      set(() => ({ saving: false }));
      return;
    }
    try {
      await updateResume(id, { title, templateId, data });
    } finally {
      set(() => ({ saving: false }));
    }
  }, 800);
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  id: null,
  title: "",
  templateId: "classic",
  data: defaultResumeData,
  saving: false,

  setResume: (r) =>
    set({
      id: r.id,
      title: r.title,
      templateId: r.templateId,
      data: r.data,
    }),

  updateData: (patch) => {
    set((s) => ({ data: { ...s.data, ...patch } }));
    scheduleSave(set, get);
  },

  updateTitle: (title) => {
    set({ title });
    scheduleSave(set, get);
  },

  setTemplate: (templateId) => {
    set({ templateId });
    scheduleSave(set, get);
  },
}));
