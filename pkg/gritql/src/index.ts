// Simple module that gets mocked - demonstrates bun mock.module isolation issue

export type GritMatch = { file: string };

type Result<T> = { ok: true; value: { text: string; data: T } } | { ok: false; error: string };

// Simple function - returns one match per input file
export async function gritApply(
  _pattern: string,
  files: string[],
  _options: { language: string },
): Promise<Result<GritMatch[]>> {
  if (files.length === 0) {
    return { ok: true, value: { text: "No files", data: [] } };
  }
  const matches = files.map((file) => ({ file }));
  return { ok: true, value: { text: `Found ${matches.length}`, data: matches } };
}
