<template>
  <div class="h-full p-2 rounded flex flex-col justify-between backdrop-blur-xl bg-slate-200">
    <h1 class="mb-4">
      Timesheets
    </h1>
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from "./components/Calendar.vue";
</script>

<script>
export default {

}
</script>
