"use client";

import { useResumeStore } from "@/lib/resume-store";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Summary() {
  const { data, updateData } = useResumeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="summary">Professional summary</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => updateData({ summary: e.target.value })}
            placeholder="A brief overview of your experience and goals..."
            rows={4}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
