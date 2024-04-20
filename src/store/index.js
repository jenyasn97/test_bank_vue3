import { createLogger, createStore } from "vuex";
import auth from "../store/modules/auth.module.js";
import request from "../store/modules/request.module.js";

const plugins = [];
if (import.meta.env.NODE_ENV === "dev") {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false,
    };
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    clearMessage(state) {
      state.message = null;
    },
    openSidebar(state) {
      state.sidebar = true;
    },
    closeSidebar(state) {
      state.sidebar = false;
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit("setMessage", message);
      setTimeout(() => {
        commit("clearMessage");
      }, 5000);
    },
  },
  modules: {
    auth,
    request,
  },
});
