<template>
  <div class="p-3">
    <FullCalendar
      class="calendar-wrapper z-0"
      :options="calendarOptions"
    />
    <EventModal
      v-if="isShowModal"
      :info="info && info"
      @handleClodeModal="handleClodeModal"
      @handlePublishEvent="handlePublishEvent"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from "./EventModal.vue";
import { useTimesheetsStore } from "@/store"
import { storeToRefs } from "pinia";

export default defineComponent({
    name: "Calendar",
    components: {
        EventModal,
        FullCalendar, // make the <FullCalendar> tag available
    },
    setup() {
        const timesheetStore = useTimesheetsStore();
        const { getEvents } = storeToRefs(useTimesheetsStore());
        onMounted(async () => {
            await timesheetStore.getAllEvents();
        })
        return {
            getEvents,
            timesheetStore
        }
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                },
                editable: true,
                selectable: true,
                selectMirror: false,
                dayMaxEvents: true,
                allDaySlot: false,
                weekends: true,
                select: this.handleSelectCalendar,
                events: this.getEvents,
            },
            isShowModal: false,
            info: {},
        }
    },
    methods: {
        handleSelectCalendar(payload) {
            console.log(payload)
            this.info = payload;
            this.isShowModal = true;
        },
        handleClodeModal() {
            this.isShowModal = false;
        },
        handlePublishEvent(event) {
            this.timesheetStore.insertEvent(event);
            this.isShowModal = false;
        }
    }
})
</script>

<style lang="css" scoped>
.calendar-wrapper {
    max-height: 720px;
}
</style>