"use client";

import { useResumeStore } from "@/lib/resume-store";
import { createId } from "@paralleldrive/cuid2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UpdatePreviewButton } from "../UpdatePreviewButton";
import { useState } from "react";

export function Skills() {
  const { data, updateData } = useResumeStore();
  const groups = data.skills;

  const [tagInput, setTagInput] = useState("");

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    const nextGroups = [...groups];
    const first = nextGroups[0];
    if (first) {
      if (first.skills.includes(trimmed)) return;
      nextGroups[0] = { ...first, skills: [...first.skills, trimmed] };
    } else {
      nextGroups.push({
        id: createId(),
        label: "Skills",
        skills: [trimmed],
      });
    }
    updateData({ skills: nextGroups });
    setTagInput("");
  };

  const removeSkill = (index: number) => {
    const nextGroups = [...groups];
    const first = nextGroups[0];
    if (!first) return;
    nextGroups[0] = {
      ...first,
      skills: first.skills.filter((_, i) => i !== index),
    };
    updateData({ skills: nextGroups });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(tagInput);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Skills</CardTitle>
        <UpdatePreviewButton />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="skill-input">Add skill (type + Enter)</Label>
          <Input
            id="skill-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. JavaScript"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(groups[0]?.skills ?? []).map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 leading-none"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
