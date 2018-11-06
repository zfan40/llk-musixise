<template>
  <div id="sheet-container">
    <div ref="sheet" id="sheetcanvas"></div>
  </div>
</template>

<script>
// import loadXmlToBlock from "../tutorial/loadXmlToBlock";
import Vex from "vexflow";
import { isMeasureBeamable } from "@/util/core/scoreAPI";
// import { tutorialMixin } from "../tutorialMixin";
export default {
  name: "sheetscore",
  props: {
    xmlArrayObj: Object,
    scoreNotes: Array,
    scoreWidth: Number,
    scoreHeight: Number
  },
  watch: {
    scoreNotes: function(newVal, oldVal) {
      // watch it
      this.generateScore();
    }
  },
  methods: {
    generateScore() {
      if (!this.scoreNotes || !this.scoreNotes.length) {
        return;
      }
      if (document.querySelector("#sheetcanvas").lastChild)
        document
          .querySelector("#sheetcanvas")
          .removeChild(document.querySelector("#sheetcanvas").lastChild);
      const VF = Vex.Flow;
      const registry = new VF.Registry();
      VF.Registry.enableDefaultRegistry(registry);
      const id = id => registry.getElementById(id);
      const vf = new VF.Factory({
        renderer: {
          elementId: "sheetcanvas",
          width: 980,
          height: 640
        }
      });
      const score = vf.EasyScore();
      console.log("========= score notes =========");
      console.log(this.scoreNotes);
      /* 
       * this.scoreNotes[0] is first instrument
       * this.scoreNotes[0][0] is first part(声部) of the first instrument 
       */

      const instrumentNumber = this.scoreNotes.length;
      const maxMeasureNumber = this.scoreNotes
        .flat()
        .reduce((a, b) => (a.length > b.length ? a : b), []).length;

      //TODO 目前只能44拍
      // var system;
      for (let i = 0; i <= maxMeasureNumber - 1; i++) {
        //TODO:得找出最长的measureindex
        // i => measure index
        let system = vf.System({
          x: (i % 4) * 200 + 50, //TODO: should be based on how many notes
          y: Math.floor(i / 4) * 120 * instrumentNumber,
          width: 200,
          spaceBetweenStaves: 10
        });
        for (let j = 0; j <= instrumentNumber - 1; j++) {
          // j => instrument index
          console.log("@@@@@@@@");
          console.log("measure is", this.scoreNotes[j][0][i]);
          if (!this.scoreNotes[j][0][i]) this.scoreNotes[j][0][i] = ["b4/w/r"]; //补上个
          let feedinNotes = [];

          // try auto beam first, might give vue warn error
          if (isMeasureBeamable(this.scoreNotes[j][0][i])) {
            console.log("beamable", this.scoreNotes[j][0][i]);
            feedinNotes = [
              score.beam(
                score.notes(this.scoreNotes[j][0][i].join(","), {
                  clef: "treble" //can be bass
                }),
                {
                  autoStem: true
                }
              )
            ];
          } else {
            //   // if cannot auto beam, just use plain notes
            feedinNotes = [
              score.notes(this.scoreNotes[j][0][i].join(","), {
                clef: "treble" // can be bass
              })
            ];
          }

          const stave = system.addStave({
            voices: [
              score.voice(
                feedinNotes.reduce((a, b) => {
                  return a.concat(b);
                })
              )
            ]
          });
          if (i === 0) {
            // 首个小节加谱号
            stave.addClef("treble").addKeySignature("C"); //bass
          }
        }
        if (instrumentNumber >= 2) {
          // 多个乐器需要制作谱表
          if (i % 4 === 0) {
            system.addConnector("brace");
          }
          system.addConnector("singleRight");
          system.addConnector("singleLeft");
        }
      }
      vf.Curve({
        from: id("m0end"),
        to: id("m10")
      });
      vf.Curve({
        from: id("m1end"),
        to: id("m2end")
      });
      // vf.Curve({
      //   from: id("m1end"),
      //   to: id("m20"),
      //   options: { cps: [{ x: 0, y: 40 }, { x: 0, y: 40 }] }
      // });
      vf.draw();
      VF.Registry.disableDefaultRegistry();
    }
  },
  mounted() {
    // this.generateScore();
  }
};
</script>

<style scoped lang="scss">
#sheet-container {
  margin-top: 40px;
  height: 640px;
  background-color: white;
}
</style>
