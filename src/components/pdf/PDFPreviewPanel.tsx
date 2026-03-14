"use client";

import { memo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useResumeStore } from "@/lib/resume-store";
import { PDFClassic } from "./PDFClassic";
import { PDFModern } from "./PDFModern";
import { PDFPremium } from "./PDFPremium";

const templates = {
  classic: PDFClassic,
  modern: PDFModern,
  premium: PDFPremium,
} as const;

function PDFPreviewPanelInner() {
  // Subscribe only to preview snapshot and template — not to live `data`.
  const previewData = useResumeStore((s) => s.previewData);
  const templateId = useResumeStore((s) => s.templateId);
  const Doc =
    templates[templateId as keyof typeof templates] ?? templates.classic;

  return (
    <PDFViewer width="100%" height="100%" style={{ minHeight: 500 }}>
      <Doc data={previewData} />
    </PDFViewer>
  );
}

// Prevent re-render when parent (EditorLayout) re-renders on every keystroke.
// Panel only re-renders when previewData or templateId from the store change.
export const PDFPreviewPanel = memo(PDFPreviewPanelInner);
