<template>
  <el-collapse-item title="音符记法" name="1.5">
    <div id="1-5-1"></div>
    <div id="1-5-2"></div>
    <div id="1-5-3"></div>
    <div id="1-5-4"></div>
    <div id="1-5-5"></div>
    <div id="1-5-6"></div>
    <div>one five</div>
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
    var vf1 = new VF.Factory({
      renderer: {
        elementId: '1-5-1',
        width: 550,
        height: 180
      }
    });
    var score = vf1.EasyScore();
    var system = vf1.System();
    system.addStave({
      voices: [
        score.voice(score.notes('C5/1', {
          stem: 'up'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf1.draw();

    var vf2 = new VF.Factory({
      renderer: {
        elementId: '1-5-2',
        width: 550,
        height: 180
      }
    });
    var score = vf2.EasyScore();
    var system = vf2.System();
    system.addStave({
      voices: [
        score.voice(score.notes('C#5/2, B4', {
          stem: 'down'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf2.draw();

    var vf3 = new VF.Factory({
      renderer: {
        elementId: '1-5-3',
        width: 550,
        height: 180
      }
    });
    var score = vf3.EasyScore();
    var system = vf3.System();
    system.addStave({
      voices: [
        score.voice(score.notes('C#5/4,B4,B4,B4', {
          stem: 'down'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf3.draw();

    var vf4 = new VF.Factory({
      renderer: {
        elementId: '1-5-4',
        width: 550,
        height: 180
      }
    });
    var score = vf4.EasyScore();
    var system = vf4.System();
    system.addStave({
      voices: [
        score.voice(score.notes('C#5/8,B4,B4,B4,C#5,B4,B4,B4', {
          stem: 'down'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf4.draw();

    var vf5 = new VF.Factory({
      renderer: {
        elementId: '1-5-5',
        width: 550,
        height: 180
      }
    });
    var score = vf5.EasyScore();
    var system = vf5.System();
    system.addStave({
      voices: [
        score.voice(score.notes('C5/16,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4', {
          stem: 'up'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf5.draw();

    var vf6 = new VF.Factory({
      renderer: {
        elementId: '1-5-6',
        width: 550,
        height: 180
      }
    });
    var score = vf6.EasyScore();
    var system = vf6.System();
    system.addStave({
      voices: [
        score.voice(score.notes('C5/32,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4,C5,B4,B4,B4', {
          stem: 'up'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf6.draw();
  }
};
</script>

<style scoped lang="scss">

</style>
