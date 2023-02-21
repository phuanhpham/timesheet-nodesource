<template>
  <Modal
    :id-modal="`event-detail-modal-id`"
    :title="`Event Detail Modal`"
    @handleCloseOverlay="onCloseModal"
    @handleCloseModal="onCloseModal"
  >
    <template #default>
      <div 
        v-if="getEventLoading" 
        class="absolute flex justify-center items-center h-3/5 w-full"
      >
        <Loading />
      </div>
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
        @click="onUpdateEvent"
      >
        Update
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
import { reactive, watch, ref, defineComponent } from "vue";
import { useTimesheetsStore } from "@/store"
import { storeToRefs } from "pinia";

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { SHOW_APPOVER } from "@/helpers/constans";
import { convert2String } from "@/helpers/utils"

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import Loading from "@/components/shared/Loading.vue";
import Modal from "@/components/Modal"

export default defineComponent({
  components: {
    Modal,
    Loading,
  },
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  setup: (props) => {
    const { getEventLoading } = storeToRefs(useTimesheetsStore());

    let isShowApprover = ref(false);

    if(SHOW_APPOVER.includes(props.info.type)){
      isShowApprover.value = true;
    }

    let event = reactive({
      type: props.info.type,
      title: props.info.title,
      from: `${(props.info.start.getHours() - 9).toString().padStart(2, '0')}:${props.info.start.getMinutes().toString().padStart(2, '0')}`,
      to: `${(props.info.end.getHours() - 9).toString().padStart(2, '0')}:${props.info.end.getMinutes().toString().padStart(2, '0')}`,
      approver: props.info.approver,
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
      isShowApprover,
      getEventLoading,
    }
  },
  methods: {
    onCloseModal() {
      this.$emit("handleClodeModal");
    },
    onUpdateEvent() {
      this.$emit("handleUpdateModal", {
        id: this.info.id,
        type: this.event.type,
        title: this.event.title,
        start: convert2String(this.info.start.toISOString(), this.event.from),
        end: convert2String(this.info.start.toISOString(), this.event.to),
        approver: this.event.approver,
      })
    }
  },
});
</script>
<style lang="">
    
</style>