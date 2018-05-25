<template>
  <el-collapse-item title="音符特殊划分" name="1.23">
    <div id="1-23"></div>
    <div>1-23</div>
  </el-collapse-item>
</template>

<script>
import Vex from 'vexflow'
export default {
  name: "1.5",
  props: {

  },
  mounted() {
    const VF = Vex.Flow;
    var vf = new VF.Factory({
      renderer: {
        elementId: '1-23',
        width: 550,
        height: 180
      }
    });
    var score = vf.EasyScore();
    var system = vf.System();

    system.addStave({
      voices: [
        score.voice(
          score.notes('C#5/q, B4, B4')
            .concat(
            score.tuplet(score.beam(score.notes('A4/8, E4, C4'))))
          )
        // score.voice(score.beam(score.notes('A4/8, E4, C4, D4', {
        //   stem: 'down'
        // })))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
