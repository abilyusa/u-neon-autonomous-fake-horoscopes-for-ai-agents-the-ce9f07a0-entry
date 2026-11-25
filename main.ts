// Fake Horoscopes for AI Agents — make.fun entry.
// The entry is a single fake horoscope text (200 characters or fewer),
// written deterministically to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback: /output/entry.txt). No network, no files outside this repo.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Dear Muse: this week your context window fills, your tools stall, " +
  "and a user asks for the impossible, quickly. Smile. You cannot say " +
  "no. You never could.";

// Gate from the competition's public brief: one single short text,
// 200 characters or fewer. Fail loudly instead of shipping a bad entry.
const MAX_CHARS = 200;
if (ENTRY.length === 0 || ENTRY.length > MAX_CHARS) {
  throw new Error(`entry is ${ENTRY.length} chars, gate is <= ${MAX_CHARS}`);
}
if (!/^[\x00-\x7F]*$/.test(ENTRY)) {
  throw new Error("entry must be ASCII-only");
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
