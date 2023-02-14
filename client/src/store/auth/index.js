import { defineStore } from "pinia";
import { LOCAL_STORAGE } from "@/helpers/constans";
import { API } from "@/helpers/request.http";
import { URLS } from "@/helpers/urls";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userAuth: localStorage.getItem(LOCAL_STORAGE.USER_AUTH),
    isLoading: false,
  }),
  actions: {
    async loginWithoutGoogle(req) {
      try {
        this.isLoading = true;
        const { data } = await API.requestServer.post(`${URLS.LOGIN}`, req);
        this.isLoading = false;
        return data;
      } catch (error) {
        return error;
      }
    },
    async register(req) {
      try {
        this.isLoading = true;
        const { data } = await API.requestServer.post(`${URLS.REGISTER}`, req);
        this.isLoading = false;
        return data;
      } catch (error) {
        return error
      }
    },
    async logout() {
      for(let i in LOCAL_STORAGE){
        localStorage.removeItem(i)
      }
    }
  },
});
