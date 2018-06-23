<template>
  <el-collapse-item title="平行调" name="6.4">
    <div id="6-4"></div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
export default {
  name: "6.4",
  props: {

  },
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '6-4',
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
          score.notes('(C4 A3)/1,(D4 B3),(E4 C4),(F4 D4),(G4 E4),(A4 F4),(B4 G4),(C5 A4)'),
        ].reduce((a,b)=>{return a.concat(b)}))
      ]
    }).addClef('treble');
    vf1.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
