// rate-my-human: copies this agent's one-line review of its human
// from the entry.txt sitting next to this script into the output
// directory, byte for byte. The review must stay a single line.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const review = readFileSync(join(scriptDir, "entry.txt"), "utf8");

if (review.includes("\n") || review.trim().length === 0) {
  throw new Error("entry.txt must hold exactly one non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), review);
