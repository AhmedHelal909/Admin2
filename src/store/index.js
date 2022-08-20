import { createStore } from "vuex";
import router from "../router/index";
import auth from "./modules/auth";
import user from "./modules/user";
import role from "./modules/role";
import post from "./modules/post";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });
const state = {
  username: "ahmedhelal",
};

const getters = {};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  routeCheck(state, payload) {
    window.location.href.includes({ name: payload });
  },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
  routeCheck({ commit }, payload) {
    commit("routeCheck", payload.val);
  },
};
export default createStore({
  state,
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  getters,
  mutations,
  actions,
  modules: {
    auth,
    user,
    role,
    post
  },
});
