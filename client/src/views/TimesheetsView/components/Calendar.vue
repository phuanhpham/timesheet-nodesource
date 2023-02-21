<template>
  <div class="p-3">
    <FullCalendar
      class="calendar-wrapper z-0"
      :options="calendarOptions"
    />
    <EventModal
      v-if="isShowModal"
      :info="info && info"
      @handle-clode-modal="handleClodeModal"
      @handle-publish-event="handlePublishEvent"
    />

    <EventDetailModal 
      v-if="isShowDetailModal"
      :info="info"
      @handle-clode-modal="handleClodeModal"
      @handle-update-modal="handleUpdateModal"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

/* -------------------------------------------------------------------------------------*/
import { useTimesheetsStore } from "@/store"

/* -------------------------------------------------------------------------------------*/
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

/* -------------------------------------------------------------------------------------*/
import EventModal from "./EventModal.vue";
import EventDetailModal from "./EventDetailModel.vue";


export default defineComponent({
    name: "Calendar",
    components: {
        EventModal,
        EventDetailModal,
        FullCalendar, // make the <FullCalendar> tag available
    },
    props: {
        events: {
            type: Array,
            required: true,
        }
    },
    setup() {
        const timesheetsStore = useTimesheetsStore();
        return {
            timesheetsStore,
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
                timeZone: "local",
                editable: false,
                selectable: true,
                selectMirror: false,
                dayMaxEvents: true,
                allDaySlot: false,
                weekends: true,
                select: this.handleSelectCalendar,
                eventClick: this.handleEventClick,
                events: this.events,
            },
            isShowModal: false,
            isShowDetailModal: false,
            info: {},
        }
    },
    methods: {
        handleSelectCalendar(payload) {
            console.log(":::handleSelectCalendar", payload)
            this.info = payload;
            this.isShowModal = true;
        },
        handleClodeModal() {
            this.isShowModal = false;
            this.isShowDetailModal = false;
        },
        async handlePublishEvent(event) {
            await this.timesheetsStore.insertEvent(event)
            this.isShowModal = false;
        },
        handleEventClick(payload) {
            const {event} = payload;
            this.isShowDetailModal = true;
            this.info = {
                id: event._def.publicId,
                title: event.title,
                type: event.extendedProps.type,
                approver: event.extendedProps.approver,
                start: event._instance.range.start,
                end: event._instance.range.end,
            };
        }, 
        async handleUpdateModal(payload) {
            await this.timesheetsStore.updateEvent(payload)
        }
    }
})
</script>

<style lang="css" scoped>
.calendar-wrapper {
    max-height: 720px;
}

</style>