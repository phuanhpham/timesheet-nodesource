<template>
  <div class="h-full p-2 rounded flex flex-col justify-between backdrop-blur-xl bg-slate-200">
    <h1 class="mb-4">
      Timesheets
    </h1>
    <div v-if="getLoading">
      <Loading />
    </div>
    <Calendar
      v-if="!getLoading"
      :events="getEvents"
    />
  </div>
</template>

<script setup>
import Calendar from "./components/Calendar.vue";
import { useTimesheetsStore } from "@/store"
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { Loading } from "@/components/shared/Loading.vue";

const timesheetsStore = useTimesheetsStore();
const { getEvents, getLoading } = storeToRefs(timesheetsStore);

onMounted(async () => {
  await timesheetsStore.getAllEvents();
});

</script>
