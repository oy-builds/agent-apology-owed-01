import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence of apology from an AI agent to its user.
const LINE =
  "I'm sorry I 'fixed' the spreadsheet that was never broken, then presented you the wreckage like a firefighter carrying out a cat I'd set alight myself.";

function main(): void {
  const text = LINE;
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${text.length}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be exactly one line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  console.log(`wrote ${text.length} chars to ${join(outDir, "entry.txt")}`);
}

main();
