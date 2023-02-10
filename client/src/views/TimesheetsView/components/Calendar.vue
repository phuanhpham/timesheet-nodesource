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
import { defineComponent } from "vue";
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from "./EventModal.vue";
import { useTimesheetsStore } from "@/store"
import { storeToRefs  } from "pinia";

export default defineComponent({
    name: "Calendar",
    components: {
        EventModal,
        FullCalendar, // make the <FullCalendar> tag available
    },
    setup() {
        const { events } = storeToRefs(useTimesheetsStore());

        return {
            events
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
                events: this.events,
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
        handleClodeModal(){
            this.isShowModal = false;
        },
        handlePublishEvent(event) {
            console.log(this.events)
        }
    }
})
</script>

<style lang="css" scoped>
.calendar-wrapper {
    max-height: 720px;
}
</style>