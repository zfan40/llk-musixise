import * as types from "./mutation-types";
import Vue from "vue";
import * as API from "./api";

let req_config = {
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER);
};

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER);
};

/** ************ USER AUTH (login,register,update,logout) **************/
export const loginUser = ({ commit }, { loginInfo }) => {
  console.log("sdfsdf", loginInfo);
  // in this way, you can return a value, received by dispatch callback
  // http://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions

  return new Promise((resolve, reject) => {
    return API.loginUser(loginInfo).then(
      response => {
        console.log("action: login result:", response.data);
        commit(types.UPDATE_USER, { userInfo: response.data.data });
        resolve("hehe");
      },
      () => {
        reject();
      }
    );
  });
};

export const registerUser = ({ commit, dispatch }, { registerInfo }) => {
  console.log("sdfsdf", registerInfo);
  API.registerUser(registerInfo).then(
    response => {
      dispatch("loginUser", { loginInfo: registerInfo });
    },
    () => {
      reject();
    }
  );
  // return new Promise((resolve, reject) => {
  //   axios
  //     .post(
  //       "//blocks.musixise.com/api/user/register",
  //       JSON.stringify(registerInfo),
  //       reqConfig
  //     )
  //     .then(
  //       response => {
  //         console.log("action: register result:", response.data);
  //         if (response.data.errcode !== 0) {
  //           reject(response.data.errmsg);
  //           return;
  //         }
  //         resolve();
  //         dispatch("loginUser", { loginInfo: registerInfo });
  //       },
  //       () => {
  //         reject();
  //       }
  //     );
  // });
};

export const updateUser = ({ commit }, { updateInfo }) => {
  console.log("sdfsdf", updateInfo);
  return new Promise((resoleve, reject) => {
    Vue.axios
      .post(
        "//api.musixise.com/api/user/updateInfo",
        JSON.stringify(updateInfo),
        req_config
      )
      .then(
        response => {
          console.log("update user successful:", response.data);
          // commit(types.UPDATE_USER,{userInfo:response.data.data});
        },
        () => {
          reject();
        }
      );
  });
};

export const logoutUser = ({ commit }) => {
  req_config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  };
  commit(types.LOGOUT_USER);
};
/** ******************************************************************/
export const refreshPage = ({ dispatch, state }, { path }) => {
  // refresh the page, based on passed-in path (cannot get current path in action...)
  // console.log(path.split('/')[1])
  switch (path.split("/")[1]) {
    case "":
      dispatch("loadRecommend");
      break;
    case "recommend":
      dispatch("loadRecommend");
      break;
    case "musixiser":
      dispatch("loadMusixiserDetail", { userId: path.split("/")[2] });
      break;
    case "favorite-musixisers":
      // dispatch('loadFavMusixisers',{userId:this.userInfo.userId})
      console.log("refreshing: ", state);
      dispatch("loadFavMusixisers", { userId: state.user.userInfo.userId });
      break;
    case "favorite-works":
      dispatch("loadFavWorks", { userId: state.user.userInfo.userId });
      break;
    default:
      break;
  }
};

export const loadRecommend = ({ commit }) => {
  Vue.axios
    .post("//api.musixise.com/api/home", "", req_config)
    .then(response => {
      commit(types.RECOMMEND_LOADED, { data: response.data.data });
    });
};

export const loadFavMusixisers = ({ commit }, { userId, page }) => {
  if (!userId) {
    commit(types.REFRESH_FAV_MUSIXISERS, { data: { content: [] } });
    return;
  }
  Vue.axios
    .post(`//api.musixise.com/api/follow/followings/${userId}`, "", req_config)
    .then(response => {
      commit(types.REFRESH_FAV_MUSIXISERS, { data: response.data.data });
    })
    .catch(err => {});
};

export const loadFavWorks = ({ commit }, { userId, page }) => {
  if (!userId) {
    commit(types.REFRESH_FAV_WORKS, { data: { content: [] } });
    return;
  }
  Vue.axios
    .post(
      `//api.musixise.com/api/favorite/getWorkList/${userId}`,
      "",
      req_config
    )
    .then(response => {
      commit(types.REFRESH_FAV_WORKS, { data: response.data.data });
    })
    .catch(err => {});
};

export const followMusixiser = ({ commit }, { userId }) => {
  console.log("jb");
  const param = { followId: userId, status: 0 }; // 0 is code to follow
  Vue.axios
    .post(
      "//api.musixise.com/api/follow/add",
      JSON.stringify(param),
      req_config
    )
    .then(response => {
      commit(types.UPDATE_MUSIXISER_RELATION, { data: param });
    })
    .catch(err => {});
};

export const unfollowMusixiser = ({ commit }, { userId }) => {
  const param = { followId: userId, status: 1 }; // 1 is code to unfollow
  Vue.axios
    .post(
      "//api.musixise.com/api/follow/add",
      JSON.stringify(param),
      req_config
    )
    .then(response => {
      commit(types.UPDATE_MUSIXISER_RELATION, { data: param });
    })
    .catch(err => {});
};
export const toggleFavSong = ({ commit }, { workId, status }) => {
  Vue.axios
    .post(
      "//api.musixise.com/api/favorite/addWork",
      JSON.stringify({ workId, status }),
      req_config
    )
    .then(response => {})
    .catch(err => {});
};

export const updateRecord = ({ commit }, { status }) => {};

export const uploadRecord = ({ commit }, { record, info }) =>
  new Promise((resolve, reject) => {
    const form_req_config = {
      headers: { "Content-Type": "multipart/form-data", processData: false }
    };
    const blob = new Blob([record]);
    const reader = new FileReader();
    reader.onload = function(event) {
      const fd = new FormData();
      fd.append("fname", "test.txt");
      fd.append("data", event.target.result);
      Vue.axios
        .post("//api.musixise.com/api/uploadAudio", fd, form_req_config)
        .then(response => {
          // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
          const workURL = `http://oiqvdjk3s.bkt.clouddn.com/${
            response.data.data
          }`;
          console.log(workURL);
          const param = {
            ...info,
            url: workURL
          };
          Vue.axios
            .post(
              "//api.musixise.com/api/work/create",
              JSON.stringify(param),
              req_config
            )
            .then(response => {
              // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
              resolve();
            })
            .catch(err => {
              reject();
            });
        })
        .catch(err => {
          reject();
        });
    };
    // trigger the read from the reader...
    reader.readAsDataURL(blob);
  });

export const loadMusixiserDetail = ({ commit }, { userId }) => {
  console.log(`load musixiser detail!!!${userId}`);
  Vue.axios
    .post(`//api.musixise.com/api/user/detail/${userId}`, "", req_config)
    .then(response => {
      commit(types.GET_MUSIXISER_DETAIL, { data: response.data.data });
    })
    .catch(err => {});
  // get musixiser works
  Vue.axios
    .post(`//api.musixise.com/api/work/getListByUid/${userId}`, "", req_config)
    .then(response => {
      commit(types.GET_MUSIXISER_DETAIL_OWN_WORK, {
        data: response.data.data.content
      });
      console.log("--- own songlist ---", self.songlist);
    })
    .catch(err => {});
  // get musixiser favorite list
  Vue.axios
    .post(
      `//api.musixise.com/api/favorite/getWorkList/${userId}`,
      "",
      req_config
    )
    .then(response => {
      commit(types.GET_MUSIXISER_DETAIL_FAV_WORK, {
        data: response.data.data.content
      });
      console.log("--- fav songlist ---", self.favsonglist);
    })
    .catch(err => {});
};
