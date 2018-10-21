<template>
  <div id="sheet-container">
    <div ref="sheet" id="sheetcanvas"></div>
  </div>
</template>

<script>
// import loadXmlToBlock from "../tutorial/loadXmlToBlock";
import Vex from "vexflow";
// import { tutorialMixin } from "../tutorialMixin";
export default {
  name: "sheetscore",
  props: {
    xmlArrayObj: Object,
    scoreNotes: Array
  },
  watch: {
    scoreNotes: function(newVal, oldVal) {
      // watch it
      this.generateScore();
    }
  },
  methods: {
    generateScore() {
      const VF = Vex.Flow;
      var vf = new VF.Factory({
        renderer: {
          elementId: "sheetcanvas",
          width: 800,
          height: 840
        }
      });
      const score = vf.EasyScore();
      // test1
      // var system = vf.System({ width: 220, spaceBetweenStaves: 10 });

      // score.set({ time: "3/4" });
      // system
      //   .addStave({
      //     voices: [
      //       score.voice(
      //         [
      //           // score.notes('D5/q[id="m1a"]'),

      //           score.notes("F#4/8,G4/8,G4/8, A4/16,A4/16, B4/8, C5/8", {
      //             stem: "up"
      //           })
      //         ].reduce((a, b) => {
      //           return a.concat(b);
      //         })
      //       )
      //     ]
      //   })
      //   .addClef("treble")
      //   .addKeySignature("G")
      //   .addTimeSignature("3/4");

      // system
      //   .addStave({
      //     voices: [
      //       score.voice(score.notes("(G3 B3 D4)/h, A3/q", { clef: "bass" }))
      //     ]
      //   })
      //   .addClef("bass")
      //   .addKeySignature("G")
      //   .addTimeSignature("3/4");
      // system.addConnector("brace");
      // system.addConnector("singleRight");
      // system.addConnector("singleLeft");

      // system = vf.System({ x: 230, width: 180, spaceBetweenStaves: 10 });
      // system.addStave({
      //   voices: [
      //     score.voice(
      //       [score.notes("D5/q,G4,G4")].reduce((a, b) => {
      //         return a.concat(b);
      //       })
      //     )
      //   ]
      // });
      // system.addStave({
      //   voices: [score.voice(score.notes("B3/2.", { clef: "bass" }))]
      // });
      // system.addConnector("singleRight");
      // system.addConnector("singleLeft");

      //test2 autobeam
      // var stave = vf.Stave({ y: 40 });

      // var voice = score.voice(
      //   score.notes(
      //     "C#5/q, g5/8, (e4 g4 b4)/16, e5, d5/8, e5/q/r, a2/32, a6, a6, g4/64, g4"
      //   )
      // );

      // var beams = VF.Beam.generateBeams(voice.getTickables(), {
      //   flat_beams: true,
      //   flat_beam_offset: 155,
      //   stem_direction: -1
      // });

      // vf
      //   .Formatter()
      //   .joinVoices([voice])
      //   .formatToStave([voice], stave);

      // vf.draw();

      // beams.forEach(function(beam) {
      //   return beam.setContext(vf.getContext()).draw();
      // });
      // auto gen
      this.scoreNotes[0][0].forEach((measure, index) => {
        console.log("@@@@@@@@");
        console.log(measure);
        // vf.System({ x: (index % 4) * 160, width: 160, spaceBetweenStaves: 10 });
        vf
          .System({
            x: (index % 4) * 160,
            y: Math.floor(index / 4) * 100,
            width: 160,
            spaceBetweenStaves: 10
          })
          .addStave({
            voices: [
              score.voice(
                [score.notes(measure.join(","))].reduce((a, b) => {
                  return a.concat(b);
                })
              )
            ]
          });
      });
      vf.draw();
    }
  },
  mounted() {
    // this.generateScore();
  }
};
</script>

<style scoped lang="scss">
#sheet-container {
  background-color: white;
}
</style>
