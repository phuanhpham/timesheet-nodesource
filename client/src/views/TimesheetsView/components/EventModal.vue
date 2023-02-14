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
            <div class="grid grid-cols-6 gap-6 mb-4">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  v-model="event.type"
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
            <div class="col-span-6 sm:col-span-3 mb-4">
              <label
                for="title"
                class="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                v-model="event.title"
                type="text"
                name="title"
                autocomplete="title"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div class="grid grid-cols-6 gap-6 mb-4">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="from"
                  class="block text-sm font-medium text-gray-700"
                >
                  From
                </label>
                <input
                  id="from"
                  v-model="event.from"
                  type="time"
                  name="from"
                  step="900"
                  autocomplete="time"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="to"
                  class="block text-sm font-medium text-gray-700"
                >
                  To
                </label>
                <input
                  id="to"
                  v-model="event.to"
                  step="30000"
                  type="time"
                  name="to"
                  autocomplete="time"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
              </div>
            </div>
            <div
              v-if="isShowApprover"
              class="col-span-6 sm:col-span-3 mb-4"
            >
              <label
                for="title"
                class="block text-sm font-medium text-gray-700"
              >
                Approver
              </label>
              <input
                id="approver"
                v-model="event.approver"
                type="text"
                name="approver"
                autocomplete="approver"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #actions>
      <button 
        class="px-8 py-2 m-2 rounded-lg bg-gray-800 text-white hover:bg-gray-400 hover:text-black font-bold"
        @click="onPublishEvent"
      >
        Publish
      </button>
      <button
        class="px-8 py-2 m-2 rounded-lg bg-rose-500 text-white hover:bg-rose-200 hover:text-red-500 font-bold"
        @click="onCloseModal"
      >
        Cancel
      </button>
    </template>
  </Modal>
</template>
<script>
import { defineComponent } from "vue";
import Modal from "@/components/Modal"
import { reactive, watch, ref } from "vue";
const SHOW_APPOVER = ["holiday"]
export default defineComponent({
  components: {
    Modal,
  },
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  setup: (props) => {
    let isShowApprover = ref(false);
    let event = reactive({
      type: "schedule",
      title: "",
      from: `${props.info.start.getHours().toString().padStart(2, '0')}:${props.info.start.getMinutes().toString().padStart(2, '0')}`,
      to: `${props.info.end.getHours().toString().padStart(2, '0')}:${props.info.end.getMinutes().toString().padStart(2, '0')}`,
      approver: "",
    });
    watch(
      () => event.type,
      (newVal) => {
        if (SHOW_APPOVER.includes(newVal)) {
          isShowApprover.value = true;
        } else {
          isShowApprover.value = false;
        }
      }
    )
    return {
      event,
      isShowApprover
    }
  },
  methods: {
    onCloseModal() {
      this.$emit("handleClodeModal");
    },
    onPublishEvent() {      
      this.$emit("handlePublishEvent", {
        date: this.info.startStr.split('T')[0],
        title: this.event.title,
        type: this.event.type,
        start: `${this.info.startStr.split('T')[0]}T${this.event.from}`,
        end: `${this.info.endStr.split('T')[0]}T${this.event.to}`,
        approver: this.event.approver || null,
      })
    }
  }
})
</script>
<style lang="">
    
</style>