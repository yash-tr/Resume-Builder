"use client";

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

export function PDFPreviewPanel() {
  const { data, templateId } = useResumeStore();
  const Doc =
    templates[templateId as keyof typeof templates] ?? templates.classic;

  return (
    <PDFViewer width="100%" height="100%" style={{ minHeight: 500 }}>
      <Doc data={data} />
    </PDFViewer>
  );
}
