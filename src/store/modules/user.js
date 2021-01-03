import authApi from '@/api/common/auth'
import config from '@/config'

const user = {
  state: {
    id: null,
    name: ''
  },
  getters: {
    hasAuthInfo: state => {
      return state.id != null
    }
  },
  mutations: {
    SET_ID(state, id) {
      state.id = id
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_ACCESS_TOKEN(state, name) {
      state.name = name
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.name = name
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        authApi.login(user).then(res => {
          if (res.data.status == "SUCCESS") {
            localStorage.setItem(config.token.accessKey, res.data.accessToken);
            localStorage.setItem(config.token.refreshKey, res.data.refreshToken);
            localStorage.setItem("isRemember", user.isRemember);
            resolve(res);
          } else {
            reject(res);
          }
        }).catch(() => {
          reject(res);
        })
      })
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        let refreshToken = localStorage.getItem(config.token.refreshKey);
        if (!refreshToken) {
          resolve(false);
          return;
        }
        let accessToken = localStorage.getItem(config.token.accessKey);
        let isRemember = localStorage.getItem("isRemember") == "true" ? true : false;
        authApi.refreshToken({ accessToken, refreshToken, isRemember }).then(res => {
          if (res.data.status == "SUCCESS") {
            localStorage.setItem(config.token.accessKey, res.data.accessToken);
            localStorage.setItem(config.token.refreshKey, res.data.refreshToken);
            resolve(true);
          } else {
            resolve(false);
          }
        })

      });
    },
    //清空登录信息
    clearAuth() {
      localStorage.removeItem(config.token.accessKey);
      localStorage.removeItem(config.token.refreshKey);
      window.location.reload();
    },
    logout({ commit,dispatch }) {
      authApi.logout().then(() => {
        dispatch("clearAuth");
      })
    }
  }
}
export default user
