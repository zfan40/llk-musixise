// const BPM = 120;
// const note32 = BPM / 60 / 32;
let MidiTracks = {}; // will eventually be something like: {sin:[toneNote,toneNote,toneNote,...],piano:[toneNote,toneNote]}
let lastActiveBlockIds = [];
let currentActiveBlockIds = [];
AudioParam.prototype.cancelAndHoldAtTime = false;

let musixiseParts = [];
import { instrumentMap } from "./instrumentConfig";
import { FXMap } from "./FXConfig";

let tracks = [];
let currentTrackId = 0;

export function createTrack(timbre, tempo, volumn, metre, mute) {
  metre = metre ? eval(metre) : 1;
  // if (mute) volumn = 0;
  tracks.push({
    timbre,
    tempo,
    volumn,
    metre,
    parts: [],
    effects: {}
  });
  currentTrackId += 1;
}

export function cleanTrack() {
  tracks = [];
  currentTrackId = 0;
  musixiseParts.forEach(musixisePart => {
    musixisePart.dispose();
  });
  musixiseParts = [];
}
const Util = {
  lcm: function() {
    //求最大公约数
    //辗转相除法
    function gcd(a, b) {
      if (a == 0) return b;
      return gcd(b % a, a);
    }
    //Reduce的思路
    //依次求最小公倍数
    return Array.prototype.slice.apply(arguments).reduce(function(a, b) {
      if (!a) a = 1;
      if (!b) b = 1;
      return a * b / gcd(a, b);
    }, 1);
  },
  createUnderScores: function(n) {
    let a = "";
    for (let i = 0; i <= n - 1; i++) {
      a += "_";
    }
    return a;
  },
  createScores: function(n) {
    let a = "";
    for (let i = 0; i <= n - 1; i++) {
      a += "-";
    }
    return a;
  },
  getNoteAndOctave: function(noteStr) {
    //receives a note string, like 1 or 1' or ''1
    const note = noteStr.match(/[0-9]+/g)[0]; // string
    const octaveUp = noteStr.match(/[0-9]+'+/g)
      ? noteStr.match(/[0-9]+'+/g)[0].length - note.length
      : 0;
    const octaveDown = noteStr.match(/'+[0-9]+/g)
      ? noteStr.match(/'+[0-9]+/g)[0].length - note.length
      : 0;
    return {
      note,
      octave: octaveUp - octaveDown
    };
  },
  getToneNotes: function(sequence, beat, tempo, volumn, metre, measureCount) {
    //都是针对‘对0’
    //sequence is 'E4,E2,E3,E4' or '[E1,E2],E3,E4'
    if (!sequence || !beat) {
      return;
    }
    console.log(".....", sequence);
    console.log(".....", beat);
    const sequenceArray = JSON.parse(
      `[${sequence}]`.replace(/([ABCDEFG]#*b*[1-9])/g, '"$1"')
    ); //不对就报错
    const noteLen = measureCount * (metre * 240 / tempo / beat.length); //should replace 120 with BPM
    const toneNotes = [];

    let toneNote = {};
    let zeroCounter = 0;
    beat.split("").forEach((digit, index) => {
      if (digit.match(/\d/g)) {
        //digit shows velocity
        if (toneNote.duration) {
          toneNotes.push(toneNote);
          toneNote = {};
        }

        toneNote = {
          time: index * noteLen,
          note: sequenceArray[zeroCounter],
          duration: noteLen,
          velocity: digit === "0" ? volumn / 100 : volumn * digit / 1000
        };
        zeroCounter += 1;

        if (index === beat.length - 1) {
          //push current
          toneNotes.push(toneNote);
        }
      } else if (digit === "-") {
        if (toneNote.duration) {
          // alert("1");
          toneNote.duration += noteLen;
        }
        if (index === beat.length - 1 && toneNote.duration) {
          //push current
          toneNotes.push(toneNote);
        }
      } else if (digit === "_") {
        if (toneNote.duration) {
          // push current
          toneNotes.push(toneNote);
          toneNote = {};
        }
      }
    });
    console.log(JSON.stringify(toneNotes));
    return toneNotes;
  }
};

//when creating new measures, accumulate measure one by one
// a song has many tracks. one track can have many parts, one part can have many measures
export function createMeasureNew(
  measure,
  sequence,
  beat,
  matchZero,
  blockId,
  part
) {
  if (part == undefined) part = 1;
  if (!tracks[currentTrackId - 1].parts[part - 1]) {
    tracks[currentTrackId - 1].parts[part - 1] = {};
    tracks[currentTrackId - 1].parts[part - 1].measures = [];
    tracks[currentTrackId - 1].parts[part - 1].measures[measure - 1] = {
      measure,
      sequence,
      beat,
      matchZero,
      blockId
    };
  } else {
    tracks[currentTrackId - 1].parts[part - 1].measures[measure - 1] = {
      measure,
      sequence,
      beat,
      matchZero,
      blockId
    };
  }
}

export function createMeasureOnScaleNew( // this would finally call createMeasureNew
  measure,
  sequence,
  beat,
  scale,
  basenote,
  matchZero,
  blockId,
  part
) {
  // Ionian 1 2 3 4 5 6 7 1 [1,3,5,6,8,10,12]
  // Dorian 1 2 b3 4 5 6 b7 1 [1,3,4,6,8,10,11]
  // Phrygian 1 b2 b3 4 5 b6 b7 1 [1,2,4,6,8,9,11]
  // Lydian 1 2 3 #4 5 6 7 1 [1,3,5,7,8,10,12]
  // Mixolydian 1 2 3 4 5 6 b7 1 [1,3,5,6,8,10,11]
  // Aeolian 1 2 b3 4 5 b6 b7 1 [1,3,4,6,8,9,11]
  // Locrian 1 b2 b3 4 b5 b6 b7 1 [1,2,4,6,7,9,11]
  // harmonic major
  // melodic major
  // harmonic minor
  // melodic minor
  let scaleInterval = [1, 3, 5, 6, 8, 10, 12];
  const scales = {
    Ionian: [1, 3, 5, 6, 8, 10, 12],
    Dorian: [1, 3, 4, 6, 8, 10, 11],
    Phrygian: [1, 2, 4, 6, 8, 9, 11],
    Lydian: [1, 3, 5, 7, 8, 10, 12],
    Mixolydian: [1, 3, 5, 6, 8, 10, 11],
    Aeolian: [1, 3, 4, 6, 8, 9, 11],
    Locrian: [1, 2, 4, 6, 7, 9, 11],
    Chinese: [1, 3, 5, 8, 10],
    Japanese: [1, 5, 6, 10, 12]
  };
  if (scale) {
    scaleInterval = scales[scale];
  }
  const sequenceArray = JSON.parse(
    `[${sequence}]`.replace(/('*[0-9]+'*)/g, '"$1"')
  ); // only integer
  const notesFromNumbers = sequenceArray.map(sequenceNumber => {
    if (typeof sequenceNumber === "object") {
      //["1''","1"]
      return sequenceNumber.map(noteStr => {
        const { note, octave } = Util.getNoteAndOctave(noteStr);
        // basenote is 'C4' or 'B4'
        if (!parseInt(basenote))
          return Tone.Frequency(basenote)
            .transpose(
              12 * octave + scaleInterval[(note - 1) % scaleInterval.length] - 1
            )
            .toNote();
        //base note is 60 or 64
        return Tone.Midi(basenote)
          .transpose(
            12 * octave + scaleInterval[(note - 1) % scaleInterval.length] - 1
          )
          .toNote();
      });
    } else {
      // "1''"
      // Tone.transpose receives an integer to transpose
      const { note, octave } = Util.getNoteAndOctave(sequenceNumber);
      if (!parseInt(basenote))
        return Tone.Frequency(basenote)
          .transpose(
            12 * octave + scaleInterval[(note - 1) % scaleInterval.length] - 1
          )
          .toNote();
      //base note is 60 or 64
      return Tone.Midi(basenote)
        .transpose(
          12 * octave + scaleInterval[(note - 1) % scaleInterval.length] - 1
        )
        .toNote();
    }
  });
  // console.log(notesFromNumbers); //["C3","D3",["C3","D4"]]
  const fedNotes = notesFromNumbers.reduce((a, b) => {
    let pre = a;
    let post = b;
    if (typeof a == "object") {
      pre = `[${a}]`;
    }
    if (typeof b == "object") {
      post = `[${b}]`;
    }
    return `${pre},${post}`;
  });
  // console.log(fedNotes);
  createMeasureNew(measure, fedNotes, beat, matchZero, blockId, part);
}

// by far, we have got a track's all measures, need to process,normalize
function normalizeMeasures(part) {
  const measuresLengths = part.measures.map(a => a.beat.length);
  console.log("12121212121212122", measuresLengths);
  const lcmOfBeatLength = Util.lcm(...measuresLengths);
  // 1.转换成对0 2.把track内所有小节beat统一长度

  // 不能用foreach，foreach会直接bypass掉empty的（稀疏数组遍历）
  // part.measures.forEach((measure, measureIndex) => {});
  for (
    let measureIndex = 0;
    measureIndex <= part.measures.length - 1;
    measureIndex += 1
  ) {
    // console.log("measure::::::::::", part.measures[measureIndex]);
    if (!part.measures[measureIndex]) {
      //建一个空小节
      //TODO: bug here
      part.measures[measureIndex] = {
        measure: measureIndex + 1,
        sequence: "",
        beat: Util.createUnderScores(lcmOfBeatLength),
        matchZero: true
      };
    } else {
      if (!part.measures[measureIndex].matchZero) {
        // 对位转成对0，抽出对应的音//TODO: bug here, super mario....seemingly solved
        const sequenceArray = JSON.parse(
          `[${part.measures[measureIndex].sequence}]`.replace(
            /([ABCDEFG]#*b*[1-9])/g,
            '"$1"'
          )
        );
        const newSeqArray = part.measures[measureIndex].beat
          .split("")
          .map((beatDigit, index) => {
            if (beatDigit.match(/\d/g)) {
              return sequenceArray[index];
            } else {
              return "";
            }
          });
        // console.log("bbbbbbbbbbb", newSeqArray);

        // part.measures[measureIndex].sequence = newSeqArray.filter(note => note != "").join(","); //不行，因为内层数组会被打开
        let s = JSON.stringify(newSeqArray.filter(note => note != "")).replace(
          /"/g,
          ""
        );
        s = s.substring(1, s.length - 1); // 去掉数组的前后方括号
        part.measures[measureIndex].sequence = s;
        part.measures[measureIndex].matchZero = true;
      }
      // console.log("jjjjjjjjjjjjjj", part.measures[measureIndex].sequence);
      //对0的，beat延展就行了，原来000的可能变成0--0--0-- (根据最小公倍数)
      if (part.measures[measureIndex].beat.length < lcmOfBeatLength) {
        const ratio = lcmOfBeatLength / part.measures[measureIndex].beat.length;
        const append = Util.createScores(ratio - 1);
        part.measures[measureIndex].beat = part.measures[measureIndex].beat
          .split("")
          .join(append);
        part.measures[measureIndex].beat += append;
      }
    }
  }

  console.log("=== measure after normalization===");
  console.log(part.measures);

  //把所有measure合成一大段 应了老话「不要看小节线」
  part.tonepart = part.measures.reduce((a, b) => {
    return {
      // TODO: if a/b is empty string, no comma here, seemingly solved
      sequence: `${a.sequence}${a.sequence && b.sequence ? "," : ""}${
        b.sequence
      }`,
      beat: `${a.beat}${b.beat}`
    };
  });
  console.log("=== final part in this part ===");
  console.log(part.tonepart);
}

function prepareTrackNotes(part, track) {
  // measure: int (1)
  // timbre: string ('square')
  // sequence: array
  // beat: string
  // IMPORTANT...use an array of objects as long as the object has a "time" attribute
  // build notes
  const {
    measures,
    tonepart: { sequence, beat }
  } = part; // instead of being param, read from create part
  const { timbre, tempo, volumn, metre, effects } = track;
  console.log("!!!", part);
  let notes = Util.getToneNotes(
    sequence,
    beat,
    tempo ? tempo : 120,
    volumn,
    metre,
    measures.length
  );

  // for midi export
  let midinotes = notes.map(item => {
    if (typeof item.note === "string") {
      return {
        // ...item,
        midiNo: Tone.Frequency(item.note).toMidi(),
        velocity: item.velocity,
        startTime: item.time,
        duration: item.duration
      };
    } else if (typeof item.note === "object") {
      return item.note.map(note => {
        return {
          // ...item,
          midiNo: Tone.Frequency(note).toMidi(),
          velocity: item.velocity,
          startTime: item.time,
          duration: item.duration
        };
      });
    }
  });
  if (!MidiTracks[`${timbre}${currentTrackId}`]) {
    MidiTracks[`${timbre}${currentTrackId}`] = [midinotes]; //还有小节呢
  } else {
    MidiTracks[`${timbre}${currentTrackId}`].push(midinotes);
  }
  // for playback //musixiseParts is currently reset in about.vue
  //playback connect effect chain
  console.log("hehehehe FX:", effects);

  // let dist = Object.keys(effects).reduce((a, b) => {
  //   new FXMap(a)().connect(new FXMap(b)());
  // });
  // dist.toMaster();
  const effectNodes = Object.keys(effects).map(effectName => {
    const effect = new FXMap[effectName]();
    if (
      effectName == "panner" ||
      effectName == "tremolo" ||
      effectName == "vibrato"
    ) {
      effect.start();
    }
    // effect.wet.value = 0.5;
    // effect.wet.rampTo(0, 2, Tone.now() + 2);
    // effect.wet.rampTo(1, 2, Tone.now() + 3);
    // effect.wet.rampTo(0, 2, Tone.now() + 4);
    //TODO either loop through，either use preset param keys
    console.log(Object.entries(effects[effectName]));
    if (
      Object.entries(effects[effectName]) &&
      Object.entries(effects[effectName]).length
    ) {
      Object.entries(effects[effectName]).forEach(paramOA => {
        // paramOA ['delay',{value:[0.1,0.5,0.3],timepoint:[1,2,3]}]
        // effect['wet'] = 0.5, wet default: 1
        const paramName = paramOA[0];
        const paramObj = paramOA[1];
        // 把value的重复时间加0.01
        paramObj.timepoint.forEach((point, index, self) => {
          if (index > 0 && point === self[index - 1]) {
            self[index] = point + 0.01;
          }
        });
        console.log(paramObj);
        paramObj.value.forEach((paramvalue, index) => {
          // 没curve，硬set
          if (paramvalue) {
            // effect[paramName].setValueAtTime(
            //   paramvalue,
            //   Tone.now() + (paramObj.timepoint[index] - 1) * metre * 240 / tempo
            // );
            effect[paramName].linearRampToValueAtTime(
              paramvalue,
              Tone.now() + (paramObj.timepoint[index] - 1) * metre * 240 / tempo
            );

            // if (paramObj.timepoint[index + 1]) {
            //   effect[paramName].rampTo(
            //     paramObj.value[index + 1],
            //     (paramObj.timepoint[index + 1] - paramObj.timepoint[index]) *
            //       metre *
            //       240 /
            //       tempo,
            //     Tone.now() +
            //       (paramObj.timepoint[index] - 1) * metre * 240 / tempo
            //   );
            // }
          } else {
            console.log("空的时候");
          }
        });
      });
    }
    return effect;
  });
  // if (effectNodes[0]) {
  //   console.log(effectNodes[0]);
  //   console.log(effectNodes[0].wet);
  // }
  console.log("==========================");
  console.log(instrumentMap);
  const instrument = instrumentMap[timbre]();
  console.log(instrument);
  // var autoPanner = new Tone.AutoPanner("4n").start();
  // instrument.chain(...effectNodes, autoPanner, Tone.Master);
  instrument.chain(...effectNodes, Tone.Master);
  // instrument.toMaster();
  console.log(notes);
  // playback notes
  musixiseParts.push(
    new Tone.Part(function(time, value) {
      // arrange trigger notes
      if (timbre !== "noise") {
        instrument.triggerAttackRelease(
          value.note,
          value.duration,
          time,
          value.velocity
        );
      } else {
        instrument.triggerAttackRelease(value.duration, time, value.velocity);
      }
    }, notes).start("0.1")
  );
}

// just store effect structure
export function createEffect(
  effect,
  parameter,
  effectStartValue,
  effectStartMeasure,
  effectEndValue,
  effectEndMeasure
) {
  //the structure of effect on a track is
  // effects = {
  //   reverb: {
  //     roomSize: {
  //       value: [3, 2, 1],
  //       timepoint: [1, 2, 3]
  //     }
  //   },
  //   delay: {
  //     delayTime: {
  //         value: [3, 2, 1],
  //         timepoint: [1, 2, 3]
  //     },
  //     feedback: {
  //         value: [3, 2, 1],
  //         timepoint: [1, 2, 3]
  //     }
  //   }
  // }
  if (!tracks[currentTrackId - 1].effects[effect])
    tracks[currentTrackId - 1].effects[effect] = {};
  if (parameter && !tracks[currentTrackId - 1].effects[effect][parameter])
    tracks[currentTrackId - 1].effects[effect][parameter] = {};
  if (
    parameter &&
    !tracks[currentTrackId - 1].effects[effect][parameter].value
  ) {
    tracks[currentTrackId - 1].effects[effect][parameter].value = [
      effectStartValue,
      effectEndValue
    ];
    tracks[currentTrackId - 1].effects[effect][parameter].timepoint = [
      effectStartMeasure ? effectStartMeasure : 1,
      effectEndMeasure
    ];
  } else if (parameter) {
    tracks[currentTrackId - 1].effects[effect][parameter].value.push(
      effectStartValue,
      effectEndValue
    );
    tracks[currentTrackId - 1].effects[effect][parameter].timepoint.push(
      effectStartMeasure,
      effectEndMeasure
    );
  }
}

export function makeSound(startMeasure) {
  if (!startMeasure) startMeasure = 1;
  Tone.Transport.start(
    "+0.1",
    (startMeasure - 1) * tracks[0].metre * 240 / tracks[0].tempo
  );
}

export function prepareProject() {
  tracks.forEach(track => {
    track.parts.forEach(part => {
      normalizeMeasures(part);
      prepareTrackNotes(part, track);
    });
  });
  // tracks.forEach(track => {
  //   normalizeMeasures(track);
  //   prepareTrackNotes(track);
  // });
}

export function highlightBlock(time) {
  // console.log(tracks);
  currentActiveBlockIds = [];
  tracks.forEach(track => {
    track.parts.forEach(part => {
      const activeMeasure = parseInt(time / (track.metre * 240 / track.tempo));
      if (
        part.measures[activeMeasure] &&
        part.measures[activeMeasure].blockId
      ) {
        currentActiveBlockIds.push(part.measures[activeMeasure].blockId);
      }
    });
  });

  lastActiveBlockIds.forEach(activeBlockId => {
    Blockly.getMainWorkspace().highlightBlock(activeBlockId, false);
  });
  currentActiveBlockIds.forEach(activeBlockId => {
    Blockly.getMainWorkspace().highlightBlock(activeBlockId, true);
  });
  lastActiveBlockIds = currentActiveBlockIds;
}
