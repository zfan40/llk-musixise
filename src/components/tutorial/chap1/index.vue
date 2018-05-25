<template>
  <div style="padding-left:20px;">
    <one-five />
    <one-thirteen />
    <one-seventeen />
    <one-twentythree />
  </div>
</template>

<script>
import Vex from 'vexflow'

import OneFive from "./OneFive.vue";
import OneThirteen from "./OneThirteen.vue";
import OneSeventeen from "./OneSeventeen.vue";
import OneTwentythree from "./OneTwentythree.vue";

export default {
  name: "chap1",
  components: {
    OneFive,
    OneThirteen,
    OneSeventeen,
    OneTwentythree
  },
  props: {

  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">

</style>
