<template>
  <Modal
    :id-modal="`event-modal-id`"
    :title="`Event Modal`"
    @handleCloseOverlay="onCloseModal"
    @handleCloseModal="onCloseModal"
  >
    <template #default>
      <form
        action="#"
        method="POST"
      >
        <div class="overflow-hidden shadow">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-700"
                >Type</label>
                <select
                  id="type"
                  name="type"
                  autocomplete="type"
                  class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="schedule">
                    Schedule
                  </option>
                  <option value="holiday">
                    Holiday
                  </option>
                  <option value="leave">
                    Leave
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #actions>
      <button class="px-8 py-2 m-2 rounded-lg bg-gray-800 text-white hover:bg-gray-400 hover:text-gray-500">
        Publish
      </button>
      <button class="px-8 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-200 hover:text-red-500">
        Cancel
      </button>
    </template>
  </Modal>
</template>
<script>
import { defineComponent } from "vue";
import Modal from "@/components/Modal"

export default defineComponent({
    components: {
        Modal,
    },
    methods: {
        onCloseModal() {
            this.$emit("handleClodeModal")
        }
    }
})
</script>
<style lang="">
    
</style>