import { defineStore } from "pinia";
import { API } from "@/helpers/request.http";
import { URLS } from "@/helpers/urls";

export const useTimesheetsStore = defineStore({
  id: "timesheetsStore",
  state: () => ({
    events: [],
    isLoading: false,
  }),
  getters: {
    getEvents(state) {
      return state.events;
    },
    getLoading(state) {
      return state.isLoading;
    }
  },
  actions: {
    async insertEvent(req) {
      const res = await API.requestServer.post(`${URLS.CREATE_TIMESHEETS}`, {
        ...req
      });
      await this.getAllEvents();
    },
    async getAllEvents() {
      this.isLoading = true;
      const res = await API.requestServer.get('/timesheets/1');
      const { data } = res;
      const events = data.timesheets.map((e) => {
        return {
          id: e.id,
          title: e.title,
          start: e.start.toString().replace("Z", ""),
          end: e.end.toString().replace("Z", ""),
        }
      });
      this.events = [...events];
      this.isLoading = false;
    }
  },
});
