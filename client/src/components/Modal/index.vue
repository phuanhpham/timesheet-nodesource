<template>
  <section
    :id="idModal"
    class="absolute h-full w-full top-0 left-0 bg-transparent z-10 flex flex-col justify-center items-center"
  >
    <div
      class="w-full h-full z-20 relative top-0"
      @click="closeModal('Overlay')"
    />
    <div
      class="rounded-lg shadow-2xl z-30 absolute"
      :class="[
        'bg-slate-50',
        'h-auto',
        getWidthCustom,
      ]"
    >
      <div class="p-4 text-center bg-slate-600 rounded-t-lg">
        <span class="font-extrabold text-xl text-indigo-50">{{ title }}</span>
      </div>

      <div class="">
        <slot />
      </div>
      <div class="w-full bg-slate-200 rounded-b-lg flex justify-end items-center pl-4 pr-4">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    idModal: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "Modal",
    },
  },
  computed: {
    getWidthCustom() {
      return `w-4/5`
    }
  },
  methods: {
    closeModal(msg) {
      this.$emit(`handleClose${msg}`)
    }
  }
})
</script>
<style lang="">
    
</style>