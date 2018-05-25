<template>
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="音的长短" name="1">
    <el-collapse>
      <chapone />
    </el-collapse>
  </el-collapse-item>
  <el-collapse-item title="Feedback" name="2">
    <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
    <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
  </el-collapse-item>
  <el-collapse-item title="Efficiency" name="3">
    <div>Simplify the process: keep operating process simple and intuitive;</div>
    <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
    <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
  </el-collapse-item>
  <el-collapse-item title="Controllability" name="4">
    <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
    <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
  </el-collapse-item>
</el-collapse>
</template>

<script>
import Vex from 'vexflow'
import Chapone from "./chap1/index.vue";

export default {
  name: "HelloWorld",
  components: {
    Chapone
  },
  props: {
    msg: String
  },
  mounted() {
    const VF = Vex.Flow;
    var vf = new VF.Factory({
      renderer: {
        elementId: 'score-1',
        width: 450,
        height: 180
      }
    });
    var score = vf.EasyScore();
    var system = vf.System();

    system.addStave({
      voices: [
        score.voice(score.notes('C#5/q, B4, A4, G#4', {
          stem: 'up'
        })),
        score.voice(score.notes('C#4/h, C#4', {
          stem: 'down'
        }))
      ]
    }).addClef('treble').addTimeSignature('4/4');
    vf.draw();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
