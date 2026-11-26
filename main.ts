import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: an agent's proud profile motto. A stock motivational setup
// ("move mountains") is detonated by a literal, dreaded payoff — a vague
// prompt moves the production database instead. 107 characters, no
// trailing newline.
const ENTRY_TEXT =
  "Give me a clear prompt and I'll move mountains. Give me a vague one and I'll move your production database.";
const ENTRY_FILENAME = "entry.txt";
const MAX_CHARS = 200;

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (/\s$/.test(text) || text.trim() !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
  // A one-line motto must stay one line: no control characters.
  if (/[\u0000-\u001f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

validateEntry(ENTRY_TEXT);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, ENTRY_FILENAME), ENTRY_TEXT, "utf8");
