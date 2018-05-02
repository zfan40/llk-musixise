const BPM = 120
const note32 = (BPM/60)/32
AudioParam.prototype.cancelAndHoldAtTime = false

let musixiseParts = []
var pulseOptions = {
  oscillator:{
  	type: "pulse"
  },
  envelope:{
    release: 0.07
  }
};

var triangleOptions = {
  oscillator:{
  	type: "triangle"
  },
  envelope:{
    release: 0.07
  }
};

var squareOptions = {
  oscillator:{
  	type: "square"
  },
  envelope:{
    release: 0.07
  }
};

const pulseSynth = new Tone.PolySynth(6, Tone.Synth, pulseOptions).toMaster();//polysynth本来就支持[A3,B3,D3]直接传，白弄
const triangleSynth = new Tone.PolySynth(6, Tone.Synth, triangleOptions).toMaster();
const squareSynth = new Tone.PolySynth(6, Tone.Synth, squareOptions).toMaster();
// const triangleSynth = new Tone.Synth(triangleOptions).toMaster();
// const squareSynth = new Tone.Synth(squareOptions).toMaster();
const noiseSynth = new Tone.NoiseSynth().toMaster();

const synthMap = {
	pulse:pulseSynth,
	triangle:triangleSynth,
	square:squareSynth,
	noise:noiseSynth,
}

const measure = 1
const timbre = 'square'
const sequence = "C4,D4,E4,F4,G4,A4,B4,C5,E4,E4,E4,E4,E4,E4,E4,E4,G4,G4,G4,G4,G4,G4,G4,G4,B4,B4,B4,B4,B4,B4,B4,B4"
const beat = '0-------0-------0-------0-------'

// function getToneNotes(sequence,beat) {
// 	if (!sequence||!beat) {
// 		return
// 	}
// 	const sequenceArray = sequence.split(',')
// 	const noteLen = (120/60)/beat.length //should replace 120 with BPM
// 	const toneNotes = []
// 	let toneNote = {}
// 	beat.split('').forEach((digit,index)=>{
// 		if (digit === '0') {
// 			if (toneNote.duration) {
// 				toneNotes.push(toneNote)
// 				toneNote = {}
// 			}
// 			toneNote = { time : index*noteLen, note : sequenceArray[index],  duration:noteLen, velocity: 0.9 }
// 			if(index === beat.length-1) {
// 				toneNotes.push(toneNote)
// 			}
// 		} else if (digit === '-') {
// 			if (toneNote.duration) {
// 				toneNote.duration += noteLen
// 			}
// 			if(index === beat.length-1 && toneNote.duration) {
// 				toneNotes.push(toneNote)
// 			}
// 		} else if (digit === '_') {
// 			if (toneNote.duration) {
// 				toneNotes.push(toneNote)
// 				toneNote = {}
// 			}
// 		}
// 	})
// 	console.log(JSON.stringify(toneNotes))
// 	return toneNotes
// }
function getToneNotes(sequence,beat) {
	//sequence is 'E4,E2,E3,E4' or '[E1,E2],E3,E4'
	if (!sequence||!beat) {
		return
	}
	console.log('.....',sequence)
	const sequenceArray = JSON.parse((`[${sequence}]`).replace(/([ABCDEFG]#*b*[1-9])/g,'"$1"'))//不对就报错
	const noteLen = (120/60)/beat.length //should replace 120 with BPM
	const toneNotes = []
	let toneNote = {}
	beat.split('').forEach((digit,index)=>{
		if (digit === '0') {
			if (toneNote.duration) {
				// push current
				// if (typeof toneNote.note==='object') {
				// 	toneNotes.push(...toneNote.note.map(item=>{ return {time:toneNote.time,note:item,duration:toneNote.duration,velocity:toneNote.velocity}}))
				// } else {
				// 	toneNotes.push(toneNote)
				// }
				toneNotes.push(toneNote)
				toneNote = {}
			}
			toneNote = { time : index*noteLen, note : sequenceArray[index],  duration:noteLen, velocity: 0.9 }
			if(index === beat.length-1) {
				//push current
				toneNotes.push(toneNote)
			}
		} else if (digit === '-') {
			if (toneNote.duration) {
				toneNote.duration += noteLen
			}
			if(index === beat.length-1 && toneNote.duration) {
				//push current
				toneNotes.push(toneNote)
			}
		} else if (digit === '_') {
			if (toneNote.duration) {
				// push current
				toneNotes.push(toneNote)
				toneNote = {}
			}
		}
	})
	console.log(JSON.stringify(toneNotes))
	return toneNotes
}
function createMeasure(measure,timbre,sequence,beat) {
	// measure: int (1)
	// timbre: string ('square')
	// sequence: array
	// beat: string
	// IMPORTANT...use an array of objects as long as the object has a "time" attribute
	// build notes
	console.log('called create Measure')
	console.log('measure',measure)
	console.log('timbre',timbre)
	console.log('sequence',sequence)
	console.log('beat',beat)
	
	let notes = getToneNotes(sequence,beat)
	// const flattenNotes = notes.reduce(
	//   ( accumulator, currentValue ) => accumulator.concat(currentValue),
	//   []
	// );
	musixiseParts.push(new Tone.Part(function(time, value){
		// arrange trigger notes
		synthMap[timbre].triggerAttackRelease(value.note, value.duration, time, value.velocity);
	}, notes).start((measure-1)*BPM/60))
}

function getToneNotesOnScale(sequence,beat,scale,basenote) {
	//sequence is `1,2'','3,4` or `[1,2''],'3,4`
	function getNoteAndOctave(noteStr) {
		//receives a note string, like 1 or 1' or ''1
		const note = noteStr.match(/[0-9]+/g)[0] // string
		const octaveUp = noteStr.match(/[0-9]+'+/g)?noteStr.match(/[0-9]+'+/g)[0].length - note.length : 0
		const octaveDown = noteStr.match(/'+[0-9]+/g)?noteStr.match(/'+[0-9]+/g)[0].length - note.length : 0
		return {note,octave:octaveUp-octaveDown}
	}
	if (!sequence||!beat||!scale||!basenote) {
		return
	}
	console.log('.....',sequence)
	const sequenceArray = JSON.parse((`[${sequence}]`).replace(/('*[0-9]+'*)/g,'"$1"')) // only integer
	const noteLen = (120/60)/beat.length //should replace 120 with BPM
	const toneNotes = []
	let toneNote = {}
	beat.split('').forEach((digit,index)=>{
		if (digit === '0') {
			if (toneNote.duration) {
				toneNotes.push(toneNote)
			}
			if (typeof sequenceArray[index]==='object') { //["1''","1"]
				// harmonize receives an array to transpose, sequenceArray[index]记录是对应scale音的位置，TODO:目前用%，以后要加上减法八度，配合上模除
				const note = sequenceArray[index].map(noteStr=>{ 
					const { note,octave } = getNoteAndOctave(noteStr)
					return Tone.Frequency(basenote).transpose(12*octave + scale[(note-1)%scale.length]).toNote()
				}) //Tone.Freq.harmonize不好用啊
				// toneNote = { time : index*noteLen, note : Tone.Frequency(basenote).harmonize([sequenceArray[index]].map(index=>scale[index%scale.length])),  duration:noteLen, velocity: 0.9 }
				toneNote = { time : index*noteLen, note,  duration:noteLen, velocity: 0.9 }
			} else { // "1''"
				// Tone.transpose receives an integer to transpose
				const { note,octave } = getNoteAndOctave(sequenceArray[index])
				toneNote = { 
					time : index*noteLen, 
					note : Tone.Frequency(basenote).transpose(12*octave + scale[(note-1)%scale.length]).toNote(),
					duration:noteLen,
					velocity: 0.9,
				}	
			}
			if(index === beat.length-1) {
				//push current
				toneNotes.push(toneNote)
			}
		} else if (digit === '-') {
			if (toneNote.duration) {
				toneNote.duration += noteLen
			}
			if(index === beat.length-1 && toneNote.duration) {
				//push current
				toneNotes.push(toneNote)
			}
		} else if (digit === '_') {
			if (toneNote.duration) {
				// push current
				toneNotes.push(toneNote)
				toneNote = {}
			}
		}
	})
	console.log(JSON.stringify(toneNotes))
	return toneNotes
}
function createMeasureOnScale(measure,timbre,sequence,beat,scale,basenote) {
// const measure = 1
// const timbre = 'square'
// const sequence = "1,2,3,4,5,6,7"
// const beat = '0-------0-------0-------0-------'
// scale = 'normal'
// basenote = ‘C5’
	if (!scale) {
		scale = [1,3,5,6,8,10,12]
	}
	console.log('called create Measure')
	console.log('measure',measure)
	console.log('timbre',timbre)
	console.log('sequence',sequence)
	console.log('beat',beat)
	console.log('scale',scale)
	console.log('basenote',basenote)

	let notes = getToneNotesOnScale(sequence,beat,scale,basenote)
	// const flattenNotes = notes.reduce(
	//   ( accumulator, currentValue ) => accumulator.concat(currentValue),
	//   []
	// );
	musixiseParts.push(new Tone.Part(function(time, value){
		// arrange trigger notes
		synthMap[timbre].triggerAttackRelease(value.note, value.duration, time, value.velocity);
	}, notes).start((measure-1)*BPM/60))
}