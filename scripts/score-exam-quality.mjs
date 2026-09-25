#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { TypeSafeClient, score } from "@typesafe-ai/sdk";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const certsPath = join(root, "data/certs.json");
const data = JSON.parse(readFileSync(certsPath, "utf8"));

const client = new TypeSafeClient();

const qualityLevels = [
  "Vague or promotional: does not say what the exam actually tested, or overclaims it as a professional/vendor credential.",
  "States what the exam covers, but does not disclaim that it is not a vendor, ministry, or professional credential.",
  "States what the exam covers and disclaims that it is not a formal credential, but the disclaimer is generic.",
  "States precisely what the exam covers, names the specific credential it could be mistaken for and says this is not that, and correctly distinguishes it from any other overlapping tile on the page.",
];

async function scoreItem(item) {
  const { answers } = await client.systemOne({
    state: {
      label: item.label,
      kind: item.kind,
      stars: item.stars,
      what: item.what,
      note: item.note,
    },
    questions: {
      quality: score(
        "Judge the content quality of this platform-exam tile description: is it specific about what the exam tested, and does it clearly and specifically disclaim what it is not (a vendor/ministry credential)?",
        qualityLevels,
      ),
    },
  });
  return answers.quality;
}

const results = [];
for (const item of data.items) {
  const answer = await scoreItem(item);
  console.log(`${item.slug}: ${answer.score.toFixed(2)} (confidence ${answer.confidence.toFixed(2)})`);
  results.push(answer);
}

data.items.forEach((item, i) => {
  const answer = results[i];
  item.contentQuality = {
    score: Number(answer.score.toFixed(2)),
    confidence: Number(answer.confidence.toFixed(2)),
  };
});

writeFileSync(certsPath, JSON.stringify(data, null, 2) + "\n");
console.log(`scored ${data.items.length} items, wrote ${certsPath}`);
