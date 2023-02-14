import { defineStore } from "pinia";
import { API } from "@/helpers/request.http";
import { URLS } from "@/helpers/urls";

export const useTimesheetsStore = defineStore({
  id: "timesheetsStore",
  state: () => ({
    events: [
      // {
      //   id: 1,
      //   title:'1',
      //   start: '2023-02-14T00:00:00',
      //   end: '2023-02-15',
      // }
    ],
  }),
  getters: {
    getEvents(state) {
      return state.events;
    },
  },
  actions: {
    async insertEvent(req) {
      const res = await API.requestServer.post(`${URLS.CREATE_TIMESHEETS}`, {
        ...req
      });
    },
    async getAllEvents() {
      const res = await API.requestServer.get('/timesheets/1');
      const { data } = res;
    }
  },
});
