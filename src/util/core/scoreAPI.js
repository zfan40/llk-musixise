// const NUM_WHOLE = 1;
// const NUM_HALF = 1 / 2;
// const NUM_QUARTER = 1 / 4;
// const NUM_8 = 1 / 8;
// const NUM_16 = 1 / 16;
// const NUM_32 = 1 / 32;
// const NUM_DOT_WHOLE = 1.5 * NUM_WHOLE;
// const NUM_DOT_HALF = 1.5 * NUM_HALF;
// const NUM_DOT_QUARTER = 1.5 * NUM_DOT_QUARTER;
// const NUM_DOT_8 = 1.5 * NUM_DOT_8;
// const NUM_DOT_16 = 1.5 * NUM_DOT_16;
// const NUM_DOT_32 = 1.5 * NUM_DOT_32;

// const noteLenValue = [
//   NUM_WHOLE,
//   NUM_HALF,
//   NUM_QUARTER,
//   NUM_8,
//   NUM_16,
//   NUM_32,
//   NUM_DOT_WHOLE,
//   NUM_DOT_HALF,
//   NUM_DOT_QUARTER,
//   NUM_DOT_8,
//   NUM_DOT_16,
//   NUM_DOT_32
// ];
// const noteLenSymbol = [
//   "w",
//   "h",
//   "q",
//   "8",
//   "16",
//   "32",
//   "wd",
//   "hd",
//   "qd",
//   "8d",
//   "16d",
//   "32d"
// ];

const noteLenMap = {
  1: "w",
  0.5: "h",
  0.25: "q",
  0.125: "8",
  0.0625: "16",
  0.03125: "32",
  1.5: "wd",
  0.75: "hd",
  0.375: "qd",
  0.1875: "8d",
  0.09375: "16d",
  0.046875: "32d"
};
const example = [
  {
    beat: "0--0--_--0--",
    matchZero: true,
    sequence: ["D3", "D3", "D3"]
  },
  {
    beat: "0--0--_--0--",
    matchZero: true,
    sequence: ["D3", "D3", "D3"]
  }
];
// =>score.notes("C#5/q, g5/8, (e4 g4 b4)/16, e5/16/r, d5/8, e5/8, g5/8, a2/32, a6, a6, g4/64, g4")

// https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial
// ["D3", "D#3"] => ["d/3",'d#/3']
const toVexFlowNoteKey = myNotes => {
  if (typeof myNotes === "string") {
    return myNotes.replace(/([1-9]+)/g, "/$1").toLowerCase();
  }
  return myNotes.map(c => c.replace(/([1-9]+)/g, "/$1").toLowerCase());
};

// '0--0--_--0--' => ["q","q","qr","q"]
let toVexFlowNoteLen = beatStr => {
  //0--0--_--0--
  const noteLenMap = {
    1: "w",
    0.5: "h",
    0.25: "q",
    0.125: "8",
    0.0625: "16",
    0.03125: "32",
    1.5: "wd",
    0.75: "hd",
    0.375: "qd",
    0.1875: "8d",
    0.09375: "16d",
    0.046875: "32d"
  };

  const noteLen = [];
  const beatStrLen = beatStr.length;
  let cursor1 = 0;
  let cursor2 = 1;
  while (cursor1 < beatStrLen) {
    while (cursor2 < beatStrLen && beatStr[cursor2] === "-") {
      cursor2 += 1;
    }
    // noteLen.push((cursor2 - cursor1) / beatStrLen);
    if (beatStr[cursor1] === "_") {
      noteLen.push(`${noteLenMap[(cursor2 - cursor1) / beatStrLen]}r`);
    } else {
      noteLen.push(noteLenMap[(cursor2 - cursor1) / beatStrLen]);
    }
    cursor1 = cursor2;
    cursor2 += 1;
  }
  return noteLen;
};
toVexFlowNoteLen = 2;
