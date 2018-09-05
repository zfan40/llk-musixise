<template>
<div class="main">
  <header style="height:60px;">
    <div class="global-header">
      <p>LLK Musixise</p>
      <div class="menu-btns" v-show="userInfo.userId">
        我的作品
      </div>
      <div class="avatar">  
        <avatar />
      </div>
    </div>
  </header>
  <div id="work-container">
    <div class="song-item" v-for="item in musixiserOwnWorks" :key="item.id">
      <song-grid :workObj="item" :onclickcell="baba"/>
    </div>
  </div>
  <user-forms />
</div>
</template>

<script>
import Avatar from "@/components/avatar.vue";
import UserForms from "@/components/UserFormView";
import SongGrid from "@/components/common/songGrid";
// import scopeEval from "scope-eval";
// import {
//   createTrack,
//   cleanTrack,
//   createMeasureNew,
//   createMeasureOnScaleNew,
//   createEffect,
//   makeSound,
//   prepareProject,
//   highlightBlock
// } from "../util/core/audioAPI";

let clock;
export default {
  name: "workspace",
  components: {
    Avatar,
    UserForms,
    SongGrid
  },
  data() {
    return {
      showTutorial: false,
      tutorialHeight: 0,
      startMeasure: 1
    };
  },
  computed: {
    userInfo() {
      this.fetchData();
      return this.$store.state.user.userInfo;
    },
    musixiserOwnWorks() {
      return this.$store.state.musixiserdetail.ownWorks;
    }
  },
  methods: {
    fetchData() {
      let userId =
        this.$route.params.id || this.$store.state.user.userInfo.userId;
      if (userId) {
        this.$store.dispatch("loadMusixiserDetail", {
          userId
        });
        this.$store.dispatch("loadMusixiserWorks", {
          userId,
          pagination: { currentPage: 1 }
        });
        this.$store.dispatch("loadMusixiserFavWorks", {
          userId,
          pagination: { currentPage: 1 }
        });
      }
    },
    handleToggleTutorial() {
      this.showTutorial = !this.showTutorial;
    },
    baba(a) {
      console.log(a);
    }
  },
  created() {
    this.fetchData();
  },
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
#work-container {
  position: relative;
  display: flex;
  .song-item {
    margin: 20px;
  }
}
.global-header {
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 60px;
  line-height: 60px;
  margin: 0;
  padding-left: 28px;
  background-color: #ffcc33;
  .menu-btns {
    flex: 2;
    padding-left: 30%;
  }
  .avatar {
    padding-right: 10px;
    // padding-top: 5px;
    display: flex;
    align-items: center;
  }
}
</style>
