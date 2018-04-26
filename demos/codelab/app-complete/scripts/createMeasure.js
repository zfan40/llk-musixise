const BPM = 120
const note32 = (BPM/60)/32
AudioParam.prototype.cancelAndHoldAtTime = false

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

const pulseSynth = new Tone.Synth(pulseOptions).toMaster();
const triangleSynth = new Tone.Synth(triangleOptions).toMaster();
const squareSynth = new Tone.Synth(squareOptions).toMaster();
const noiseSynth = new Tone.NoiseSynth().toMaster();

const synthMap = {
	pulse:pulseSynth,
	triangle:triangleSynth,
	square:squareSynth,
	noise:noiseSynth,
}

const measure = 1
const timbre = 'sin'
const sequence = "C4,D4,E4,F4,G4,A4,B4,C5,E4,E4,E4,E4,E4,E4,E4,E4,G4,G4,G4,G4,G4,G4,G4,G4,B4,B4,B4,B4,B4,B4,B4,B4"
const beat = '0-------0-------0-------0-------'

function getToneNotes(sequence,beat) {
	if (!sequence||!beat) {
		return
	}
	const sequenceArray = sequence.split(',')
	const noteLen = (120/60)/beat.length //should replace 120 with BPM
	const toneNotes = []
	let toneNote = {}
	beat.split('').forEach((digit,index)=>{
		if (digit === '0') {
			if (toneNote.duration) {
				toneNotes.push(toneNote)
				toneNote = {}
			}
			toneNote = { time : index*noteLen, note : sequenceArray[index],  duration:noteLen, velocity: 0.9 }
			if(index === beat.length-1) {
				toneNotes.push(toneNote)
			}
		} else if (digit === '-') {
			if (toneNote.duration) {
				toneNote.duration += noteLen
			}
			if(index === beat.length-1 && toneNote.duration) {
				toneNotes.push(toneNote)
			}
		} else if (digit === '_') {
			if (toneNote.duration) {
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
	// timbre: string ('sin')
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
	var part = new Tone.Part(function(time, value){
		// arrange trigger notes
		synthMap[timbre].triggerAttackRelease(value.note, value.duration, time, value.velocity);
	}, notes).start((measure-1)*BPM/60);
}