<template>
  <el-collapse-item title="自然大调" name="5.1">
    <p>C大调</p>
    <div id="5-1-1"></div>
    <p>G大调</p>
    <div id="5-1-2"></div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
export default {
  name: "five-1",
  props: {

  },
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '5-1-1',
        width: 500,
        height: 180
      }
    });
    var score = vf1.EasyScore();
    var system = vf1.System({width:440,spaceBetweenStaves: 10});
    score.set({ time: '8/1' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.notes('C4/1,D4,E4,F4,G4,A4,B4,C5'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble');
    vf1.draw();

    var vf2 = new VF.Factory({
      renderer: {
        elementId: '5-1-2',
        width: 500,
        height: 180
      }
    });
    var score = vf2.EasyScore();
    var system = vf2.System({width:440,spaceBetweenStaves: 10});
    score.set({ time: '8/1' }); //important
    system.addStave({
      voices: [
        score.voice([
          score.notes('G4/1,A4,B4,C5,D5,E5,F#5,G5'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble');
    vf2.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
