import axios from "axios";
import router from "../router";

const requestAxios = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_FB_URL,
});

requestAxios.interceptors.response.use(null, function (error) {
  if (error.response.status === 401) {
     router.push("/auth?message=auth");
  }
  return Promise.reject(error);
});

export default requestAxios;
