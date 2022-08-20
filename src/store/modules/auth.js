import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const state = {
  loggedIn: false,
  user: null,
  token: null,
};

const getters = {
  get_loggedIn: (state) => state.loggedIn,
  get_user: (state) => state.user,
  get_token: (state) => state.token,
};
const mutations = {
  set_loggedIn: (state, loggedIn) => (state.loggedIn = loggedIn),
  set_token: (state, token) => (state.token = token),
  set_user: (state, user) => (state.user = user),
};
const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://127.0.0.1:8000/api/login`, {
          email: payload.email,
          password: payload.password,
        })
        .then((res) => {
          commit("set_token", res.data.token);
          commit("set_user", res.data.user);
          commit("set_loggedIn", true);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout(context) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `http://127.0.0.1:8000/api/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${context.state.token}`,
            },
          }
        )
        .then((res) => {
          context.commit("set_token", null);
          context.commit("set_user", null);
          context.commit("set_loggedIn", false);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  checkUser({ state }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "http://127.0.0.1:8000/api/checkUser",
          {},
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  state,
  plugins: [
    new createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  getters,
  mutations,
  actions,
};
