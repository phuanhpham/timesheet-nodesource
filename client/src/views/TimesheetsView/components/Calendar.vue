<template>
  <div class="p-3">
    <FullCalendar
      class="calendar-wrapper z-0"
      :options="calendarOptions"
    />
    <EventModal
      v-if="isShowModal"
      @handleClodeModal="handleClodeModal"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from "./EventModal.vue"

export default defineComponent({
    name: "Calendar",
    components: {
        EventModal,
        FullCalendar, // make the <FullCalendar> tag available
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
                weekends: true,
                select: this.handleSelectCalendar,
            },
            isShowModal: false,
        }
    },
    methods: {
        handleSelectCalendar(info) {
            console.log("info", info)
            this.isShowModal = true;
        },
        handleClodeModal(){
            console.log("clicked this")
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