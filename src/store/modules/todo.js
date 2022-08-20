import axios from "axios";

const state = {
  todos: [],
  todo: {},
};
const getters = {
  allTodos: (state) => state.todos,
  todo: (state) => {
    return state.todo;
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  addTodo: (state, todo) => state.todos.push(todo),
  removeTodo: (state, todo) => state.todos.splice(state.todos.indexOf(todo), 1),
  updateTodo: (state, updateTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updateTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updateTodo);
    }
  },
  setSingltodo: (state, todo) => (state.todo = todo),
};
const actions = {
  async fetchTodos({ commit }) {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", result.data);
  },
  async addTodo({ commit }, title) {
    let result = await axios.post(
      `https://jsonplaceholder.typicode.com/todos`,
      {
        title: title,
        completed: false,
      }
    );
    commit("addTodo", result.data);
  },
  async removeTodo({ commit }, todo) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`);
    commit("removeTodo", todo);
  },
  async updateTodo({ commit }, updateTodo) {
    const result = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`,
      updateTodo
    );
    commit("updateTodo", result.data);
  },
  async fetchsingletodo(context, id) {
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    context.commit("setSingltodo", result.data);
    return context.getters.todo;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
