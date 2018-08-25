import * as Cookies from "js-cookie";
// import Vue from 'vue';
const axios = require("axios");

axios.interceptors.response.use(res => {
  if (res.data.errcode !== "0") {
    alert(res.data.resmsg);
    return Promise.reject(res);
  }
  return res;
});
const reqConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};
// const tokenObj = { access_token: '' };
// TODO:cause 500?????? just cuz this few lines???

export function getUserInfo(wxcode) {
  const tokenInCookie = Cookies.get("serviceToken");
  if (tokenInCookie) {
    // alert('cookie used');
    reqConfig.headers.Authorization = `${tokenInCookie}`;
    // tokenObj.access_token = tokenInCookie;
    return axios.get("//blocks.musixise.com/api/v1/user/getInfo", reqConfig);
  } else if (!tokenInCookie && wxcode) {
    // alert('no cookie');
    return new Promise((resolve, reject) => {
      axios
        .post(
          `//blocks.musixise.com/api/v1/user/oauth/wechat/callback?code=${wxcode}`,
          "",
          reqConfig
        )
        .then(
          res => {
            if (res.data.errcode === 20001) {
              reject(20001); // 相当于return了
            }
            const serviceToken = res.data.data.id_token;
            reqConfig.headers.Authorization = `${serviceToken}`;
            // tokenObj.access_token = serviceToken;
            Cookies.set("serviceToken", serviceToken, {
              expires: 7
            });
            return axios.get(
              "//blocks.musixise.com/api/v1/user/getInfo",
              reqConfig
            );
          },
          () => {
            reject();
          }
        )
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  // !tokenInCookie&&!wxcode的情况在app.js里处理, 不会走到这里
  return false;
}

export function uploadRecord(record, info) {
  return new Promise((resolve, reject) => {
    const formReqConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        processData: false,
        Authorization: reqConfig.headers.Authorization
      }
    };
    const blob = new Blob([JSON.stringify(record)]);
    const reader = new FileReader();
    reader.onload = async event => {
      const fd = new FormData();
      fd.append("fname", "test.txt");
      fd.append("data", event.target.result);
      // fd.append('access_token', tokenObj.access_token);
      let postFix = "";
      try {
        // important, othereise dispatch won't be stoped here...
        postFix = await axios.post(
          "//blocks.musixise.com/api/v1/uploadAudio",
          fd,
          formReqConfig
        );
      } catch (e) {
        console.log(e);
        reject(e);
      }
      const workURL = `${postFix.data.data}`;
      const param = {
        // ...tokenObj,
        ...info, // title,content.cover
        url: workURL
      };
      console.log(workURL);
      return axios
        .post(
          "//blocks.musixise.com/api/v1/work/create",
          JSON.stringify(param),
          reqConfig
        )
        .then(res => {
          resolve(res.data.data);
        })
        .catch(err => {
          reject(err);
        });
    };
    reader.readAsDataURL(blob);
  });
  // trigger the read from the reader...
}

export function fetchMbox(id) {
  return axios.get(`//blocks.musixise.com/api/v1/work/detail/${id}`, reqConfig);
}
export function fetchMusixiser(id) {
  return axios.get(`//blocks.musixise.com/api/v1/user/detail/${id}`, reqConfig);
}
export function fetchWorksFromMusixiser(id, page) {
  return axios.get(
    `//blocks.musixise.com/api/v1/work/getListByUid/${id}?page=${page}&size=15`,
    reqConfig
  );
}
export function fetchFavWorks(id, page) {
  return axios.get(
    `//blocks.musixise.com/api/v1/favorite/getWorkList/${id}?page=${page}&size=15`,
    reqConfig
  );
}
export function toggleFavSong({ workId, status }) {
  return axios.post(
    "//blocks.musixise.com/api/v1/favorite/create",
    JSON.stringify({ workId, status }),
    reqConfig
  );
  // .then((res) => { console.log(res); })
  // .catch((err) => { console.log(err); });
}
export function updateWorkTitle({ id, title }) {
  return axios.put(
    `//blocks.musixise.com/api/v1/work/updateWork/${id}`,
    JSON.stringify({ title }),
    reqConfig
  );
  // .then((res) => { console.log(res); })
  // .catch((err) => { console.log(err); });
}
export function getRecommendations() {
  return axios.post("//blocks.musixise.com/api/v1/home", "", reqConfig);
}

// below is PC login
export function loginUser(loginInfo) {
  return new Promise((resolve, reject) => {
    const tokenInCookie = Cookies.get("serviceToken");
    if (tokenInCookie) {
      reqConfig.headers.Authorization = `${tokenInCookie}`;
      return axios.get("//blocks.musixise.com/api/v1/user/getInfo", reqConfig);
    } else {
      axios
        .post(
          "//blocks.musixise.com/api/v1/user/authenticate",
          JSON.stringify(loginInfo),
          reqConfig
        )
        .then(
          response => {
            console.log("authenticate user:", response.data);
            reqConfig.headers.Authorization = `${response.data.data.id_token}`;
            Cookies.set("serviceToken", response.data.data.id_token, {
              expires: 7
            });
            // reqConfig.headers.Authorization = `Bearer ${response.data.id_token}`; // 验证通过
            return axios.get(
              "//blocks.musixise.com/api/v1/user/getInfo",
              reqConfig
            );
          },
          () => {
            reject("denglu");
          }
        )
        .then(
          response => {
            // console.log("action: login result:", response.data);
            // commit(types.UPDATE_USER, { userInfo: response.data.data });
            resolve(response);
          },
          () => {
            reject();
          }
        );
    }
  });
}

export const registerUser = registerInfo => {
  console.log("sdfsdf", registerInfo);
  return new Promise((resolve, reject) => {
    axios
      .post(
        "//blocks.musixise.com/api/v1/user/register",
        JSON.stringify(registerInfo),
        reqConfig
      )
      .then(
        response => {
          console.log("action: register result:", response.data);
          if (response.data.errcode !== 0) {
            reject(response.data.errmsg);
            return;
          }
          resolve(registerInfo);
          // dispatch("loginUser", { loginInfo: registerInfo });
        },
        () => {
          reject();
        }
      );
  });
};

export const updateUser = ({ commit }, { updateInfo }) => {
  console.log("sdfsdf", updateInfo);
  return new Promise((resoleve, reject) => {
    axios
      .post(
        "//blocks.musixise.com/api/user/updateInfo",
        JSON.stringify(updateInfo),
        reqConfig
      )
      .then(
        response => {
          console.log("update user successful:", response.data);
          resolve(response.data);
          // commit(types.UPDATE_USER,{userInfo:response.data.data});
        },
        () => {
          reject();
        }
      );
  });
};
