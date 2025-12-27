// Minimal reproduction - uses @tool/gritql which gets mocked in test

import { gritApply } from "@tool/gritql";

export async function extractPatterns(files: string[]): Promise<{ count: number }> {
  const result = await gritApply("`function $name() {}`", files, { language: "js" });
  if (!result.ok) {
    return { count: 0 };
  }
  return { count: result.value.data.length };
}
