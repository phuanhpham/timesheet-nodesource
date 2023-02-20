import { defineStore } from "pinia";
import { API } from "@/helpers/request.http";
import { URLS } from "@/helpers/urls";
import { LOCAL_STORAGE } from "@/helpers/constans";

export const useTimesheetsStore = defineStore({
  id: "timesheetsStore",
  state: () => ({
    events: [],
    isLoading: false,
    isEventLoading: false,
    error: {
      isError: false,
      errorMsg: "",
    },
  }),
  getters: {
    getEvents(state) {
      return state.events;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    },
    getEventLoading(state) {
      return state.isEventLoading;
    },
  },
  actions: {
    async insertEvent(req) {
      this.isEventLoading = true;
      try {
        const { data } = await API.requestServer.post(
          `${URLS.CREATE_TIMESHEETS}`,
          {
            ...req,
          }
        );
        if (data.status === "10200") {
          this.events.push({
            id: data.createdTimesheet.id,
            title: data.createdTimesheet.title,
            start: data.createdTimesheet.start,
            end: data.createdTimesheet.end,
            type: data.createdTimesheet.type,
          });
        }
        this.isEventLoading = false;
      } catch (error) {
        this.error.isError = true;
        this.error.errorMsg = "Something went wrong!";
      }
    },
    async getAllEvents() {
      this.isLoading = true;
      const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_AUTH))
        .user.id;
      try {
        const res = await API.requestServer.get(
          `${URLS.CREATE_TIMESHEETS}/${userId}`
        );
        const { data } = res;
        if (data.msg) {
          this.events = [];
        } else {
          const events = data.timesheets.map((e) => {
            return {
              id: e.id,
              title: e.title,
              start: e.start,
              end: e.end,
              type: e.type,
            };
          });
          this.events = events;
        }
        this.isLoading = false;
      } catch (error) {
        this.error.isError = true;
        this.error.errorMsg = "Something went wrong!";
      }
    },
  },
});
