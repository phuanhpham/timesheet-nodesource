<template>
  <div class="min-h-screen flex bg-slate-100">
    <Sidebar :user-info="userAuth.user" />
    <main class="flex-1 p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "@/components/shared/Sidebar.vue";

const userAuth = JSON.parse(localStorage.getItem('userAuth')) || null;

</script>