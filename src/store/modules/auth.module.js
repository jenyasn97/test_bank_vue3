import axios from "axios";
import { error } from "../../utils/error.js";

const TOKEN_KEY = "jwt-token";

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
    };
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(_, getters) {
      return !!getters.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {

        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_VUE_APP_FB_KEY}`;


        const { data } = await axios.post(URL, {
          ...payload,
          returnSecureToken: true,
        });
        commit("setToken", data.idToken);
        commit("clearMessage", null, { root: true });
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: error(e.response.data.error.message),
            type: "danger",
          },
          { root: true }
        );
        console.log(error(e.response.data.error.message));
        throw new Error(e);
      }
      /*commit('setToken', 'TEST_TOKEN')*/
    },
  },
};
