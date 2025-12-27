// Test in the mocked module - gets affected by mock in consumer.test.ts

import { describe, expect, test } from "bun:test";
import { gritApply } from "./index";

describe("gritApply (producer test - gets affected by mock)", () => {
  test("returns matches for files", async () => {
    const result = await gritApply("pattern", ["/a.ts", "/b.ts"], { language: "js" });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.value.data.length).toBe(2);
    expect(result.value.data[0]?.file).toBe("/a.ts");
  });

  test("returns empty for empty file list", async () => {
    const result = await gritApply("pattern", [], { language: "js" });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.data.length).toBe(0);
  });
});
