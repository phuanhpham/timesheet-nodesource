<template>
  <div class="w-full p-6 rounded-md flex justify-center items-center flex-col backdrop-blur-sm bg-white/30">
    <p class="w-full font-bold text-white pt-3 text-6xl text-center">
      {{ currentTime.toLocaleTimeString() }}
    </p>
    <p class="w-full font-bold text-white pt-3 text-6xl text-end">
      {{ currentTime.toLocaleDateString() }}
    </p>
  </div>
</template>
<script>
import { defineComponent, ref, onUnmounted } from 'vue';

export default defineComponent({
    setup() {
        let currentTime = ref(new Date());
        const updateCurrentTime = () => {
            currentTime.value = new Date();
        };
        const updateTimeInterval = setInterval(updateCurrentTime, 1000);
        onUnmounted(() => {
            clearInterval(updateTimeInterval);
        });

        return {
            currentTime
        }
    },
})
</script>
<style lang="">
    
</style>