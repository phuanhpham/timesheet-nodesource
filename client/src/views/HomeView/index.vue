<template>
  <div class="flex flex-col justify-center items-center p-2 backdrop-blur-xl bg-slate-200 rounded h-full">
    <Clock />
    <div class="w-full mt-4 flex justify-between">
      <router-link :to="{name: 'Timesheets'}">
        <button class="p-4 font-bold text-white">
          Timesheets
        </button>
      </router-link>
      <router-link :to="{name: 'Requests'}">
        <button class="p-4 font-bold text-white">
          Requests
        </button>
      </router-link>
      <router-link :to="{name: 'Timesheets'}">
        <button class="p-4 font-bold text-white">
          Assets
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import Clock from "./components/Clock.vue"
</script>
