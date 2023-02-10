import { defineStore } from "pinia";

export const useTimesheetsStore = defineStore({
  id: "timesheetsStore",
  state: () => ({
    events: [],
  }),
  actions: {},
});
