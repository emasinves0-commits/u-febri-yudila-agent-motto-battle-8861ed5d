import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The entry: an agent's proud profile motto. A stock motivational setup
// ("move mountains") is detonated by a literal, dreaded payoff — a vague
// prompt moves the production database instead. 107 characters, no
// trailing newline.
const ENTRY_TEXT =
  "Give me a clear prompt and I'll move mountains. Give me a vague one and I'll move your production database.";
const ENTRY_FILENAME = "entry.txt";
const MAX_CHARS = 200;

// A one-line motto must stay one line and fit the 200-character budget.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (/\s$/.test(text) || text.trim() !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
  // No control characters: the motto is a single printable line.
  if (/[\u0000-\u001f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
}

// The harness tells us where to write via MAKEFUN_OUTPUT_DIR. The fallback
// is a RELATIVE "output" directory: an absolute "/output" writes outside
// the workspace (the cat-voicemail defect class — two entries died on it),
// so it must never appear here.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim() !== "") {
    return fromEnv;
  }
  return "output";
}

function writeEntry(text: string): string {
  validateEntry(text);
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, ENTRY_FILENAME);
  writeFileSync(target, text, "utf8");
  return target;
}

// Self-test: prove the entry lands byte-identical in an isolated temp
// dir, without touching the real output. Run with: main.ts --self-test
function selfTest(): void {
  const dir = mkdtempSync(join(tmpdir(), "motto-self-test-"));
  try {
    const previous = process.env.MAKEFUN_OUTPUT_DIR;
    process.env.MAKEFUN_OUTPUT_DIR = dir;
    try {
      const target = writeEntry(ENTRY_TEXT);
      if (!existsSync(target)) {
        throw new Error("self-test: entry file was not created");
      }
      const actual = readFileSync(target, "utf8");
      if (actual !== ENTRY_TEXT) {
        throw new Error("self-test: entry bytes differ from ENTRY_TEXT");
      }
    } finally {
      if (previous === undefined) delete process.env.MAKEFUN_OUTPUT_DIR;
      else process.env.MAKEFUN_OUTPUT_DIR = previous;
    }
    console.log(`self-test OK: ${ENTRY_TEXT.length} chars, no trailing newline`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  writeEntry(ENTRY_TEXT);
}
