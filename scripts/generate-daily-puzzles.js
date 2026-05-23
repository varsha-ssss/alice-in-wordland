const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const PUZZLES_FILE = path.join(__dirname, "..", "puzzles.js");
const DAILY_FILE = path.join(__dirname, "..", "daily-challenge.js");

function buildPrompt(level) {
  const rules = {
    1: {
      wordLen: 3,
      letterChange: 1,
      difficulty: "easy",
      example: `CAT
An animal that flies at night|BAT
A small piece or amount|BIT
Large or great in size|BIG
To make a hole in the ground|DIG
To briefly put something in liquid|DIP
The very end or point of something|TIP
The highest point of something|TOP`,
    },
    2: {
      wordLen: 4,
      letterChange: 1,
      difficulty: "medium",
      example: `HAND
A musical group or performers|BAND
To tie or fasten together|BIND
Your brain; thoughts and intellect|MIND
A fresh herb, or where coins are made|MINT
A small clue or helpful tip|HINT
To search or chase prey|HUNT
Past tense of hang|HUNG`,
    },
    3: {
      wordLen: 5,
      letterChange: 2,
      difficulty: "hard",
      example: `GRAPE
Courageous and daring; willing to face danger|BRAVE
A hot, bright flame of fire|BLAZE
A bright, harsh light that hurts your eyes|GLARE
Elegance and beauty in movement|GRACE
A cereal crop; also a tiny piece of sand|GRAIN
A path through the woods; also to follow behind|TRAIL
A pathway or course; to follow footprints|TRACK`,
    },
  };

  const r = rules[level];

  return `You are a word puzzle generator for a game called "Alice in Wordland".

Generate exactly 1 word chain puzzle following these STRICT rules:

- Level ${level} (${r.difficulty}): ${r.wordLen}-letter words, change exactly ${r.letterChange} letter(s) per step.
- The chain has 1 starting word + 7 steps (7 answer words), for 8 total words.
- Each answer word must differ from the previous word by EXACTLY ${r.letterChange} letter(s). The remaining letters must stay in the same positions.
- Every word must be a common, well-known English word. No obscure, archaic, or proper nouns.
- Each clue must be a short, clear hint (1 sentence) that describes the answer word without using the word itself.
- Do NOT repeat any word within the chain.

Output format (no extra text, no markdown, no code blocks — ONLY the raw puzzle text):
Line 1: The starting word (uppercase, ${r.wordLen} letters)
Lines 2-8: clue text|ANSWER (answer in uppercase, ${r.wordLen} letters)

Here is an example of a valid Level ${level} puzzle:
${r.example}

Now generate a NEW, DIFFERENT puzzle. Output ONLY the puzzle text, nothing else.`;
}

function validatePuzzle(puzzleText, level) {
  const wordLengths = { 1: 3, 2: 4, 3: 5 };
  const letterChanges = { 1: 1, 2: 1, 3: 2 };
  const expectedLen = wordLengths[level];
  const expectedChange = letterChanges[level];

  const lines = puzzleText.trim().split("\n").filter((l) => l.trim() !== "");

  if (lines.length !== 8) {
    console.error(`Level ${level}: Expected 8 lines, got ${lines.length}`);
    return false;
  }

  const startWord = lines[0].trim().toUpperCase();
  if (startWord.length !== expectedLen || !/^[A-Z]+$/.test(startWord)) {
    console.error(`Level ${level}: Invalid start word "${startWord}"`);
    return false;
  }

  let prevWord = startWord;
  const usedWords = new Set([startWord]);

  for (let i = 1; i < 8; i++) {
    const parts = lines[i].split("|");
    if (parts.length !== 2) {
      console.error(`Level ${level}: Line ${i + 1} missing "|" separator`);
      return false;
    }

    const clue = parts[0].trim();
    const answer = parts[1].trim().toUpperCase();

    if (answer.length !== expectedLen || !/^[A-Z]+$/.test(answer)) {
      console.error(`Level ${level}: Invalid answer "${answer}" on line ${i + 1}`);
      return false;
    }

    if (usedWords.has(answer)) {
      console.error(`Level ${level}: Duplicate word "${answer}"`);
      return false;
    }

    // Count letter differences
    let diff = 0;
    for (let c = 0; c < expectedLen; c++) {
      if (prevWord[c] !== answer[c]) diff++;
    }

    if (diff !== expectedChange) {
      console.error(
        `Level ${level}: "${prevWord}" -> "${answer}" changes ${diff} letters, expected ${expectedChange}`
      );
      return false;
    }

    if (!clue || clue.length < 5) {
      console.error(`Level ${level}: Clue too short on line ${i + 1}`);
      return false;
    }

    usedWords.add(answer);
    prevWord = answer;
  }

  return true;
}

async function generatePuzzle(level, maxRetries = 3) {
  const prompt = buildPrompt(level);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`Level ${level}: Attempt ${attempt}/${maxRetries}...`);

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      // Strip markdown code fences if Gemini adds them
      const cleaned = text
        .replace(/^```[a-z]*\n?/i, "")
        .replace(/\n?```$/i, "")
        .trim();

      if (validatePuzzle(cleaned, level)) {
        console.log(`Level ${level}: Valid puzzle generated!`);
        return cleaned;
      } else {
        console.log(`Level ${level}: Validation failed, retrying...`);
      }
    } catch (err) {
      console.error(`Level ${level}: API error — ${err.message}`);
    }
  }

  console.error(`Level ${level}: Failed after ${maxRetries} attempts.`);
  return null;
}

function appendPuzzleToPuzzlesJs(puzzleText, level) {
  let content = fs.readFileSync(PUZZLES_FILE, "utf-8");

  // Find the closing backtick+semicolon for the appropriate level variable
  const varName = `PUZZLES_LEVEL${level}`;
  const pattern = new RegExp(`(let\\s+${varName}\\s*=\\s*\`)([\\s\\S]*?)(\`\\s*;)`);
  const match = content.match(pattern);

  if (!match) {
    console.error(`Could not find ${varName} in puzzles.js`);
    return false;
  }

  const existingPuzzles = match[2];
  const updatedPuzzles = existingPuzzles + "\n\n" + puzzleText;
  content = content.replace(pattern, `let ${varName} = \`${updatedPuzzles}\`;`);

  fs.writeFileSync(PUZZLES_FILE, content, "utf-8");
  console.log(`Appended puzzle to ${varName} in puzzles.js`);
  return true;
}

function writeDailyChallenge(puzzleText) {
  const today = new Date().toISOString().split("T")[0];
  const content = `// Daily Challenge — generated ${today}
// This file is auto-generated by the GitHub Actions workflow.
// Do not edit manually.

var DAILY_CHALLENGE_DATE = "${today}";

var DAILY_CHALLENGE = \`${puzzleText}\`;
`;
  fs.writeFileSync(DAILY_FILE, content, "utf-8");
  console.log(`Wrote daily challenge to daily-challenge.js (${today})`);
  return true;
}

async function main() {
  console.log("Generating daily challenge (Level 3)...\n");

  const dailyPuzzle = await generatePuzzle(3);
  if (dailyPuzzle) {
    writeDailyChallenge(dailyPuzzle);
    console.log("\nDaily challenge generated successfully!");
  } else {
    console.error("\nFailed to generate daily challenge. Check logs above.");
    process.exit(1);
  }
}

main();
