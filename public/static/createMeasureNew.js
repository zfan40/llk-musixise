const BPM = 120;
// const note32 = BPM / 60 / 32;
let MidiTracks = {}; // will eventually be something like: {sin:[toneNote,toneNote,toneNote,...],piano:[toneNote,toneNote]}
AudioParam.prototype.cancelAndHoldAtTime = false;

let musixiseParts = [];
var pulseOptions = {
  oscillator: {
    type: "pulse"
  },
  envelope: {
    release: 0.07
  }
};
var triangleOptions = {
  oscillator: {
    type: "triangle"
  },
  envelope: {
    release: 0.07
  }
};
var squareOptions = {
  oscillator: {
    type: "square"
  },
  envelope: {
    release: 0.07
  }
};

const pulseSynth = new Tone.PolySynth(6, Tone.Synth, pulseOptions).toMaster(); //polysynth本来就支持[A3,B3,D3]直接传，白弄
const triangleSynth = new Tone.PolySynth(
  6,
  Tone.Synth,
  triangleOptions
).toMaster();
const squareSynth = new Tone.PolySynth(6, Tone.Synth, squareOptions).toMaster();
// const triangleSynth = new Tone.Synth(triangleOptions).toMaster();
// const squareSynth = new Tone.Synth(squareOptions).toMaster();
const noiseSynth = new Tone.NoiseSynth().toMaster();

// sampler instruments
const musicbox = new Tone.Sampler(
  {
    B3: "B3.[mp3|ogg]",
    E4: "E4.[mp3|ogg]",
    G4: "G4.[mp3|ogg]",
    B4: "B4.[mp3|ogg]",
    "C#5": "Cs5.[mp3|ogg]",
    E5: "E5.[mp3|ogg]",
    G5: "G5.[mp3|ogg]",
    B5: "B5.[mp3|ogg]",
    "C#6": "Cs6.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/mbox/"
  }
).toMaster();
var piano = new Tone.Sampler(
  {
    C4: "C4.[mp3|ogg]",
    "D#4": "Ds4.[mp3|ogg]",
    "F#4": "Fs4.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    "D#5": "Ds5.[mp3|ogg]",
    "F#5": "Fs5.[mp3|ogg]",
    A5: "A5.[mp3|ogg]",
    C6: "C6.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/piano/"
  }
).toMaster();
var harp = new Tone.Sampler(
  {
    A2: "A2.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    A6: "A6.[mp3|ogg]",
    C3: "C3.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    E3: "E3.[mp3|ogg]",
    E5: "E5.[mp3|ogg]",
    G3: "G3.[mp3|ogg]",
    G5: "G5.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/harp/"
  }
).toMaster();
// synth
const instrumentMap = {
  pulse: pulseSynth,
  triangle: triangleSynth,
  square: squareSynth,
  noise: noiseSynth,
  musicbox,
  piano,
  harp
};

const tracks = [];
let currentTrack = {};
let currentTrackId = 0;
function createTrack(timbre, tempo, volumn, metre) {
  metre = metre ? eval(metre) : 1;
  // alert(metre);
  currentTrack = {
    timbre,
    tempo,
    volumn,
    metre,
    measures: []
  };
  currentTrackId += 1;
  // tracks.push(currentTrack);
}
function cleanTrack() {
  tracks = [];
  currentTrackId = 0;
  currentTrack = {};
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
      return a * b / gcd(a, b);
    }, 1);
  },
  createUnderScores: function(n) {
    const a = "";
    for (let i = 0; i <= n - 1; i++) {
      a += "_";
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
    return { note, octave: octaveUp - octaveDown };
  }
};
//when creating new measures, accumulate measure one by one
function accumulateMeasure(measure, sequence, beat, matchZero) {
  currentTrack.measures[measure] = { measure, sequence, beat, matchZero };
}
// by far, we have got a track's all measures, need to process,normalize
function normalizeMeasures() {
  const measuresLengths = currentTrack.measures.map(a => a.beat.length);
  const lcmOfBeatLength = Util.lcm(...measuresLengths);
  //process each, to make each measure consistent: 1.全部对0 2.beat长度相同
  currentTrack.measures.forEach((measure, measureIndex) => {
    if (!measure) {
      measure.measure = measureIndex;
      measure.sequence = Util.createUnderScores(lcmOfBeatLength);
      measure.beat = Util.createUnderScores(lcmOfBeatLength);
      measure.matchZero = true;
    } else {
      if (!measure.matchZero) {
        //对位转成对0，抽出对应的音
        const notesStr = measure.beat.split("").map((beatDigit, index) => {
          if (beatDigit.match(/\d/g)) {
            return measure.sequence[index];
          } else {
            return "";
          }
        });
        measure.sequence = notesStr.filter(note => note != "").join(",");
        measure.matchZero = true;
      }
      //对0的，beat延展就行了，原来000的可能变成0__0__0__ (根据最小公倍数)
      if (measure.beat.length < lcmOfBeatLength) {
        const ratio = lcmOfBeatLength / measure.beat.length;
        const append = Util.createUnderScores(ratio);
        measure.beat.split("").join(append);
        measure.beat += append;
      }
    }
    console.log("=== measure after normalization===");
    console.log(currentTrack);
  });

  //merge all,
}
function getToneNotes(sequence, beat, tempo, volumn, metre) {
  //都是针对‘对0’
  // 那就没有对0的了，就是都是matchZero
  //sequence is 'E4,E2,E3,E4' or '[E1,E2],E3,E4'
  if (!sequence || !beat) {
    return;
  }
  console.log(".....", sequence);
  const sequenceArray = JSON.parse(
    `[${sequence}]`.replace(/([ABCDEFG]#*b*[1-9])/g, '"$1"')
  ); //不对就报错
  const noteLen = metre * 240 / tempo / beat.length; //should replace 120 with BPM
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
function createMeasureNew(measure, sequence, beat, matchZero) {
  // measure: int (1)
  // timbre: string ('square')
  // sequence: array
  // beat: string
  // IMPORTANT...use an array of objects as long as the object has a "time" attribute
  // build notes
  const { timbre, tempo, volumn, metre } = currentTrack; // instead of being param, read from create track
  console.log("called create Measure");
  console.log("measure", measure);
  console.log("timbre", timbre);
  console.log("sequence", sequence);
  console.log("beat", beat);

  let notes = getToneNotes(sequence, beat, tempo ? tempo : 120, volumn, metre);
  // const flattenNotes = notes.reduce(
  //   ( accumulator, currentValue ) => accumulator.concat(currentValue),
  //   []
  // );

  // for midi export
  let midinotes = notes.map(item => {
    if (typeof item.note === "string") {
      return {
        // ...item,
        midiNo: Tone.Frequency(item.note).toMidi(),
        velocity: item.velocity,
        startTime:
          item.time + (measure - 1) * metre * 240 / (tempo ? tempo : BPM),
        duration: item.duration
      };
    } else if (typeof item.note === "object") {
      return item.note.map(note => {
        return {
          // ...item,
          midiNo: Tone.Frequency(note).toMidi(),
          velocity: item.velocity,
          startTime:
            item.time + (measure - 1) * metre * 240 / (tempo ? tempo : BPM),
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
  // for playback
  musixiseParts.push(
    new Tone.Part(function(time, value) {
      // arrange trigger notes
      if (timbre !== "noise") {
        instrumentMap[timbre].triggerAttackRelease(
          value.note,
          value.duration,
          time,
          value.velocity
        );
      } else {
        instrumentMap[timbre].triggerAttackRelease(
          value.duration,
          time,
          value.velocity
        );
      }
    }, notes).start((measure - 1) * metre * 240 / (tempo ? tempo : BPM))
  );
}
// const measure = 1
// const timbre = 'square'
// const sequence = "1,2,3,4,5,6,7"
// const beat = '0-------0-------0-------0-------'
// scale = 'normal'
// basenote = ‘C5’
function createMeasureOnScaleNew(
  measure,
  sequence,
  beat,
  scale,
  basenote,
  matchZero
) {
  // TODO: 转换成createMeasureNew即可!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        return Tone.Frequency(basenote)
          .transpose(
            12 * octave + scaleInterval[(note - 1) % scaleInterval.length] - 1
          )
          .toNote();
      });
    } else {
      // "1''"
      // Tone.transpose receives an integer to transpose
      const { note, octave } = Util.getNoteAndOctave(sequenceNumber);
      return Tone.Frequency(basenote)
        .transpose(
          12 * octave + scaleInterval[(note - 1) % scaleInterval.length] - 1
        )
        .toNote();
    }
  });
  console.log(notesFromNumbers); //["C3","D3",["C3","D4"]]
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
  console.log(fedNotes);
  createMeasureNew(measure, fedNotes, beat, matchZero);
}
