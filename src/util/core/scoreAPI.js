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

// const noteLenMap = {
//   1: "w",
//   0.5: "h",
//   0.25: "q",
//   0.125: "8",
//   0.0625: "16",
//   0.03125: "32",
//   1.5: "wd",
//   0.75: "hd",
//   0.375: "qd",
//   0.1875: "8d",
//   0.09375: "16d",
//   0.046875: "32d"
// };
const example = [
  {
    beat: "0--0--_--0--",
    matchZero: true,
    sequence: [["D3", "D5"], "D3", "D3"]
  },
  {
    beat: "0--0--_--0--",
    matchZero: true,
    sequence: ["D3", "D3", "D3"]
  }
];
// =>score.notes("C#5/q, g5/8, (e4 g4 b4)/16, e5/16/r, d5/8, e5/8, g5/8, a2/32, a6, a6, g4/64, g4")
const toEzScore = measures => {
  return measures.map(measure => {
    const noteKeys = toEZVexFlowNoteKey(measure.sequence); //'d3,d#3,a3,(d3,d5)'
    const noteLens = toEZVexFlowNoteLen(measure.beat); //["q","q","q/r","q.",'8']
    console.log(noteKeys);
    console.log(noteLens);
    let counter = 0;
    return noteLens.map(noteLen => {
      if (noteLen.indexOf("/r") === -1) {
        // a note
        counter += 1;
        return `${noteKeys[counter - 1]}/${noteLen}`;
      } else {
        // a rest
        return `e4/${noteLen}`;
      }
    });
  });
};
// ["D3", "D#3","A3",["D3","D5"]] => ['d3','d#3','a3','(d3,d5)']
const toEZVexFlowNoteKey = notes => {
  return notes.map(note => {
    if (typeof note === "string") {
      return note.toLowerCase();
    } else {
      return `(${note.join(" ").toLowerCase()})`;
    }
  });
};

// https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial
// ["D3", "D#3"] => ["d/3",'d#/3']
const toVexFlowNoteKey = notes => {
  return notes.map(note => {
    if (typeof note === "string") {
      return note.replace(/([1-9]+)/g, "/$1").toLowerCase();
    } else {
      return note.map(c => c.replace(/([1-9]+)/g, "/$1").toLowerCase());
    }
  });
};

// '0--0--_--0--' => ["q","q","qr","qd"]
const toVexFlowNoteLen = (beatStr, noteLenMap, restSymbol) => {
  //0--0--_--0--
  if (noteLenMap == undefined)
    noteLenMap = {
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
  if (restSymbol == undefined) restSymbol = "r";
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
      noteLen.push(
        `${noteLenMap[(cursor2 - cursor1) / beatStrLen]}${restSymbol}`
      );
    } else {
      noteLen.push(noteLenMap[(cursor2 - cursor1) / beatStrLen]);
    }
    cursor1 = cursor2;
    cursor2 += 1;
  }
  return noteLen;
};

// '0--0--_--0--' => ["q","q","q/r","q."]
const toEZVexFlowNoteLen = beatStr => {
  console.log("jb", beatStr);
  return toVexFlowNoteLen(
    beatStr,
    {
      1: "w",
      0.5: "h",
      0.25: "q",
      0.125: "8",
      0.0625: "16",
      0.03125: "32",
      1.5: "w.",
      0.75: "h.",
      0.375: "q.",
      0.1875: "8.",
      0.09375: "16.",
      0.046875: "32."
    },
    "/r"
  );
};
//["c3/8", "e3/q", "g3/q", "b3/q", "b3/8"]=>true
const isMeasureBeamable = noteArray =>
  noteArray.filter(a => _isShorterThanQuarterNote(a)).length >= 2; //目前仅要求为：至少有两个小于四分音符的音符

// "c3/8" => true; "c3/q"=> false
const _isShorterThanQuarterNote = noteStr => {
  console.log("ss");
  return (
    noteStr.indexOf("/8") >= 0 ||
    noteStr.indexOf("/16") >= 0 ||
    noteStr.indexOf("/32") >= 0 ||
    // noteStr.indexOf("/8.") >= 0 ||
    noteStr.indexOf("/16.") >= 0 ||
    noteStr.indexOf("/32.") >= 0
  );
};

export { toEzScore, isMeasureBeamable };
