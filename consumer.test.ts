// Test that mocks @tool/gritql - causes isolation issues with apply.test.ts

import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { extractPatterns } from "./consumer";

const mockGritApply = mock(() =>
  Promise.resolve({
    ok: true as const,
    value: { text: "Found 2 matches", data: [{}, {}] },
  }),
);

describe("consumer test (does the mocking)", () => {
  beforeAll(() => {
    mock.module("@tool/gritql", () => ({
      gritApply: mockGritApply,
    }));
  });

  afterAll(() => {
    mock.restore();
    mock.clearAllMocks();
  })

  test("uses mocked gritApply", async () => {
    const result = await extractPatterns(["/test/file.ts"]);
    expect(result.count).toBe(2);
    expect(mockGritApply).toHaveBeenCalled();
  });
});
