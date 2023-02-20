<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign up your account
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        action="#"
        method="POST"
        @submit="handleRegister"
      >
        <input
          type="hidden"
          name="remember"
          value="true"
        >
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label
              for="username"
              class="sr-only"
            >Username</label>
            <input
              id="username"
              v-model="registerUser.username"
              name="username"
              type="text"
              autocomplete="username"
              required=""
              class="relative block w-full appearance-none rounded-t-md rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
            >
          </div>
          <div>
            <label
              for="email-address"
              class="sr-only"
            >Email address</label>
            <input
              id="email-address"
              v-model="registerUser.email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            >
          </div>
          <div>
            <label
              for="password"
              class="sr-only"
            >Password</label>
            <input
              id="password"
              v-model="registerUser.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            >
          </div>
        </div>

        <div class="flex items-center justify-between bg-red-50 rounded-sm">
          <span
            v-if="error.isError"
            class="text-red-500 p-1.5"
          > * {{ error.msg }}</span>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link :to="{name: 'Login'}">
              <span
                class="cursor-pointer font-medium text-slate-600 hover:text-indigo-500"
              >
                Already exist account.
              </span>
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                v-if="!isLoading"
                class="h-5 w-5 text-slate-200"
                aria-hidden="true"
              />
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import { ref } from "vue";
import { useAuthStore } from "@/store/index";
import { storeToRefs  } from "pinia";
import { HTTP_STATUS } from "@/helpers/constans";
import router from "@/router";

let registerUser = {
  username: "",
  email: "",
  password: ""
}

let error = ref({
  isError: false,
  msg: "",
})

const authStore = useAuthStore();
const { isLoading } = storeToRefs(authStore)

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await authStore.register(registerUser);
    if(HTTP_STATUS.SUCESS.includes(res.status)){
      localStorage.setItem("userAuth", JSON.stringify(res.user));
      localStorage.setItem("accessToken", res.user.accessToken);
      router.push({name: "Home"});
    } else {
      error.value.isError = true;
      error.value.msg = res.msg;
    }
  } catch (e) {
    console.log(error)
  }
}


</script>

<script>
  
</script>