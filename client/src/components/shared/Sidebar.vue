<template>
  <div class="min-h-creen p-4">
    <div class="h-full flex-none bg-slate-600 p-2 w-56 text-center flex flex-col justify-between rounded-md">
      <div>
        <!-- <router-link :to="{ name: 'Home' }">
          <div
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-200/20 text-white"
          >
            <i class="bi bi-house-door-fill" />
            <span class="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'Timesheets' }">
          <div
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-200/20 text-white"
          >
            <i class="bi bi-house-door-fill" />
            <span class="text-[15px] ml-4 text-gray-200 font-bold">Timesheets</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'Requests' }">
          <div
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-200/20 text-white"
          >
            <i class="bi bi-house-door-fill" />
            <span class="text-[15px] ml-4 text-gray-200 font-bold">Requests</span>
          </div>
        </router-link>

        <router-link :to="{ name: 'Requests' }">
          <div
            v-if="isAdmin"
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-200/20 text-white"
          >
            <i class="bi bi-house-door-fill" />
            <span class="text-[15px] ml-4 text-gray-200 font-bold">All Users</span>
          </div>
        </router-link> -->

        <router-link
          v-for="item in usersNavigation"
          :key="item.name"
          :to="item.to"
        >
          <div
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-200/20 text-white"
            :class="[
              $route.name === item.name
                ? 'bg-slate-200/20'
                : ''
            ]
            "
          >
            <span class="text-[15px] ml-4 text-gray-200 font-bold">{{ item.name }}</span>
          </div>
        </router-link>
      </div>
      <div>
        <div
          class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-200/20 text-white"
        >
          <span class="text-[15px] ml-4 text-gray-200 font-bold">{{ username }}</span>
        </div>
        <div class="my-4 bg-white-600 h-[1px]" />
        <div
          class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-200/20 text-white"
          @click="handleLogout"
        >
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ADMIN_CONDITIONS = ['admin']
import router from "@/router";
export default {
  props: {
    userInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isAdmin: ADMIN_CONDITIONS.includes(this.userInfo.role) ? true : false,
      username: this.userInfo && this.userInfo.username,
      usersNavigation: [
        { name: "Home", to: { name: "Home" }, picked: "home" },
        { name: "Timesheets", to: { name: "Timesheets" }, picked: "timesheets" },
        { name: "Requests", to: { name: "Requests" }, picked: "requests" },
      ],
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('userAuth');
      localStorage.removeItem('accessToken');
      router.push({ name: "Login" });
    }
  }
}

</script>

<style lang="scss" scoped>

</style>