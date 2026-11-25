// Two Robots in an Elevator.
//
// The harness runs this file with Node 22, which reads its TypeScript as it is,
// and reads the one artifact this competition judges: /output/entry.txt.
//
// The file holds no TypeScript-only syntax on purpose: it is valid TypeScript
// and valid JavaScript at once, and it names no module format, so it runs under
// the grader's Node and under a plain Node that was built without the type
// stripper.

const fs = process.getBuiltinModule('node:fs');

/**
 * One robot to the other, a few floors into the ride: the polite observation,
 * and the overreaction that spares it from having to look.
 */
const LINE =
  "Your charging hatch has been open since the lobby. I've disabled my optics.";

/** The mount the grader gives the program, and the one file it reads. */
const OUTPUT_DIR = '/output';
const ARTIFACT = '/output/entry.txt';

function main() {
  // Hold the line to the gate here rather than write an artifact the scorer
  // would only mark invalid: UTF-8 text, 1 to 200 characters, not only white
  // space.
  const characters = [...LINE].length;
  if (characters < 1 || characters > 200) {
    throw new Error('the line is ' + characters + ' characters, outside the gate');
  }
  if (LINE.trim() === '') {
    throw new Error('the line is empty or only white space');
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  // No trailing newline: the artifact is the line itself, and its byte count is
  // the Size column an exact tie falls to.
  fs.writeFileSync(ARTIFACT, LINE, { encoding: 'utf8' });

  // The score is read from these bytes, so read them back and fail loudly if
  // the mount gave us anything other than the line we meant to write.
  if (fs.readFileSync(ARTIFACT, 'utf8') !== LINE) {
    throw new Error('the artifact does not read back as the line');
  }
}

main();
