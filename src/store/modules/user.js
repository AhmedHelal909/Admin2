import axios from "axios";

const state = {
  users: [],
  user: {},
};
const getters = {
  allUsers: (state) => state.users,
  getUser: (state) => state.user,
};
const mutations = {
  setUsers: (state, users) => (state.users = users),
  addUser: (state, user) => state.users.push(user),
  removeUser: (state, user) => state.users.splice(state.users.indexOf(user), 1),
  updateUser: (state, user) => {
    const index = state.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      state.users.splice(index, 1, user);
    }
  },
  setUser: (state, user) => (state.user = user),
};
const actions = {
  addUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `http://127.0.0.1:8000/api/users`,
          {
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
            password_confirmation: user.password_confirmation,
            address: user.address,
            role_id: [user.role_id],
          },
          {
            headers: {
              Authorization: `Bearer ${this.getters.get_token}`,
            },
          }
        )
        .then((res) => {
          commit("addUser", res.data.user);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  allUsers({ commit, getters }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:8000/api/users`, {
          headers: {
            Authorization: `Bearer ${getters.get_token}`,
          },
        })
        .then((res) => {
          commit("setUsers", res.data.users);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getUser({ commit, getters }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${getters.get_token}`,
          },
        })
        .then((res) => {
          commit("setUser", res.data);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${this.getters.get_token}`,
          },
        })
        .then((res) => {
          commit("removeUser", user);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `http://127.0.0.1:8000/api/users/${user.id}`,
          {
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
            password_confirmation: user.password_confirmation,
            address: user.address,
            role_id: [user.role_id],
          },
          {
            headers: {
              Authorization: `Bearer ${this.getters.get_token}`,
            },
          }
        )
        .then((res) => {
          commit("updateUser", user);
          if (user.id == this.getters.get_user.id) {
            commit("set_user", user);
          }
          commit("setUser", user);
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
  getters,
  mutations,
  actions,
};
