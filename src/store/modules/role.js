import axios from "axios";

const state = {
  roles: [],
  role: {},
  models: ["users", "roles", "doctors"],
  maps: ["create", "read", "update", "delete"],
};
const getters = {
  allRoles: (state) => state.roles,
  allModels: (state) => state.models,
  allMaps: (state) => state.maps,
  getRole: (state) => state.role,
};
const mutations = {
  setRoles: (state, roles) => (state.roles = roles),
  addRole: (state, role) => state.roles.push(role),
  removeRole: (state, role) => state.roles.splice(state.roles.indexOf(role), 1),
  setRole: (state, role) => (state.role = role),
  updateRole: (state, role) => {
    const index = state.roles.findIndex((r) => r.id === role.id);

    if (index !== -1) {
      state.roles.splice(index, 1, role);
    }
  },
};
const actions = {
  allRoles({ commit, getters }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:8000/api/roles`, {
          headers: {
            Authorization: `Bearer ${getters.get_token}`,
          },
        })
        .then((res) => {
          commit("setRoles", res.data.roles);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addRole({ commit, getters }, role) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `http://127.0.0.1:8000/api/roles`,
          {
            name: role.name,
            display_name: role.display_name,
            description: role.description,
            permissions: role.permissions,
          },
          {
            headers: {
              Authorization: `Bearer ${getters.get_token}`,
            },
          }
        )
        .then((res) => {
          commit("addRole", res.data.role);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteRole({ commit, getters }, role) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/roles/${role.id}`, {
          headers: {
            Authorization: `Bearer ${getters.get_token}`,
          },
        })
        .then((res) => {
          commit("removeRole", role);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateRole({ commit, getters }, role) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `http://127.0.0.1:8000/api/roles/${role.id}`,
          {
            name: role.name,
            display_name: role.display_name,
            description: role.description,
            permissions: role.permissions,
          },
          {
            headers: {
              Authorization: `Bearer ${getters.get_token}`,
            },
          }
        )
        .then((res) => {
          commit("updateRole", res.data.role);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getRole({ commit, getters }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:8000/api/roles/${id}/edit`, {
          headers: {
            Authorization: `Bearer ${getters.get_token}`,
          },
        })
        .then((res) => {
          commit("setRole", res.data.role);
          resolve(res);
        })
        .then((res) => {
          reject(res);
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
