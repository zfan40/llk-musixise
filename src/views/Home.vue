<template>
<div class="main">
  <header style="height:60px;">
    <global-header />
  </header>
  <div>content</div>
  <user-forms />
</div>
</template>

<script>
import Avatar from "@/components/avatar.vue";
import UserForms from "@/components/UserFormView";
import SongGrid from "@/components/common/songGrid";
import GlobalHeader from "@/components/GlobalHeader";

export default {
  name: "home",
  components: {
    Avatar,
    UserForms,
    SongGrid,
    GlobalHeader
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
  updated() {}
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
