<template>
  <div class="h-full p-2 rounded flex flex-col justify-between backdrop-blur-xl bg-slate-200">
    <span class="p-3 w-full font-bold text-xl text-slate-600">
      Timesheets
    </span>
    <div class="w-full p-3 flex justify-center items-center">
      <Loading />
      Comming soon!
    </div>
    <div
      v-if="getLoading"
      class="flex justify-center items-center h-full"
    >
      <Loading />
    </div>
    <Calendar
      v-if="!getLoading"
      :events="getEvents"
    />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useTimesheetsStore } from "@/store"
import { storeToRefs } from "pinia";
import Calendar from "./components/Calendar.vue";
import Loading from "@/components/shared/Loading.vue";

export default {
  components: {
    Calendar,
    Loading,
  },
  setup() {
    const timesheetsStore = useTimesheetsStore();
    const { getEvents, getLoading } = storeToRefs(timesheetsStore);
    onMounted(async () => {
      await timesheetsStore.getAllEvents();
    });

    return {
      getEvents,
      getLoading,
    }
  },
}
</script>