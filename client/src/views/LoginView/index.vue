
<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        @submit="handleLogin"
      >
        <input
          type="hidden"
          name="remember"
          value="true"
        >
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label
              for="user-name"
              class="sr-only"
            >User name</label>
            <input
              id="user-name"
              v-model="user.username"
              name="username"
              type="username"
              autocomplete="username"
              required=""
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="User name"
            >
          </div>
          <div>
            <label
              for="password"
              class="sr-only"
            >Password</label>
            <input
              id="password"
              v-model="user.password"
              name="password"
              type="password"
              autocomplete="password"
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
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="user.remember"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            >
            <label
              for="remember-me"
              class="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >Forgot your password?</a>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link :to="{ name: 'Register' }">
              <span class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                Go to sign up account
              </span>
            </router-link>
          </div>
          <!-- <GoogleLogin :callback="loginWithGoogle" /> -->
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                v-if="!isLoading"
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import { useAuthStore } from "@/store/index";
import { storeToRefs  } from "pinia";
import { HTTP_STATUS } from "@/helpers/constans";
import router from "@/router";
import { ref, inject } from 'vue';

let user = {
  username: localStorage.getItem("userRemember") !== null ? JSON.parse(localStorage.getItem("userRemember")).username : "",
  password: localStorage.getItem("userRemember") !== null ? JSON.parse(localStorage.getItem("userRemember")).password : "",
  remember: localStorage.getItem("userRemember") !== null ? true : false,
}

let error = ref({
  isError: false,
  msg: "",
})

const authStore = useAuthStore();

const { isLoading } = storeToRefs(authStore)

const handleLogin = async (e) => {
  e.preventDefault();
  if (user.remember) {
    localStorage.setItem("userRemember", JSON.stringify({
      username: user.username,
      password: user.password,
    }))
  }
  else {
    localStorage.removeItem("userRemember");
  }

  const req = {
    username: user.username,
    password: user.password,
  }
  try {
    const res = await authStore.loginWithoutGoogle(req);
    if(HTTP_STATUS.SUCESS.includes(res.status)){
      localStorage.setItem("userAuth", JSON.stringify(res));
      router.push({name: "Home"})
    }else {
      error.value.isError = true;
      error.value.msg = res.msg;
    }
  } catch (e) {
    error.value.isError = true;
    error.value.msg = "Something went wrong please login again";
  }
}
</script>