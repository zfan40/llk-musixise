<template>
  <el-collapse-item title="附点" name="1.17">
    <div id="1-17"></div>
    <div>1-17</div>
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
        elementId: '1-17',
        width: 550,
        height: 180
      }
    });
    var score = vf.EasyScore();
    var system = vf.System();

    system.addStave({
      voices: [
        score.voice(score.notes('C#5/2., B4/4', {
          stem: 'up'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
