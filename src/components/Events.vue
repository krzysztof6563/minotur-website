<template>
    <section id="wydarzenia">
        <div class="container section-pad">
            <h2>Nadchodzące wydarzenia</h2>
            <div class="grid-2x">
                <div class="list" v-if="upcomingEvents.length > 0">
                    <div
                        :class="['event', event.classes || []]"
                        v-for="(event, index) in upcomingEvents"
                        :key="event.name"
                        :ref="(el) => setEventRef(event.name, el)"
                    >
                        <RouterLink :to="`/wydarzenie/${event.slug}`" style="text-decoration: none; color: inherit">
                            <h3 style="margin-top: 0">{{ event.name }}</h3>
                        </RouterLink>
                        <div>
                            <EventTable :event="event" />
                            <EventChips :event="event" />
                            <!-- <div
                                class="event-description"
                                :class="{ 'is-clamped': !isExpanded(index) }"
                                v-html="event.description"
                            ></div> -->
                        </div>
                        <!-- <hr /> -->
                    </div>
                </div>
                <div class="empty" v-else>
                    <h3 style="margin-top: 0">Brak aktualnie zaplanowanych wydarzeń</h3>
                </div>
                <div class="calendar" style="position: relative">
                    <div class="calendar-wrap" style="position: sticky; top: 2rem">
                        <FullCalendar :options="calendarOptions" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { computed, nextTick, ref } from "vue";
import { events, upcomingEvents } from "../helpers/events";
import { useRouter } from "vue-router";
import EventTable from "./EventTable.vue";
import EventChips from "./EventChips.vue";

const expandedIndices = ref(new Set());
const eventRefs = ref({});
const $router = useRouter();

const isExpanded = (index) => expandedIndices.value.has(index);

const setEventRef = (eventName, element) => {
    if (element) {
        eventRefs.value[eventName] = element;
        return;
    }

    delete eventRefs.value[eventName];
};

const toggleExpanded = (index) => {
    const next = new Set(expandedIndices.value);
    if (next.has(index)) {
        next.delete(index);
    } else {
        next.add(index);
    }
    expandedIndices.value = next;
};

function eventsToFullCalendar() {
    return events.map((el) => {
        return {
            title: el.name,
            date: el.date,
            url: `/wydarzenie/${el.slug}`,
        };
    });
}

const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    events: eventsToFullCalendar(),
    locale: plLocale,
};
</script>

<style lang="scss" scoped>
.grid-2x {
    @media screen and (min-width: 992px) {
        grid-template-columns: 2fr 4fr;
        gap: 4rem;
    }
}

.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .event:last-of-type hr {
        display: none;
    }

    hr {
        margin-block: 1.75rem;
        opacity: 0.5;
    }

    h3 {
        font-size: 1.5em;
        margin-bottom: 0.75em;
    }
}

.event-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.event-description.is-clamped {
    -webkit-line-clamp: 3;
}

.event {
    background: #21232c;
    border: 1px solid var(--accent-lighter);
    border-radius: var(--border-radius);
    padding: 1rem;

    &.focus {
        background: rgb(255 255 255 / 0.1);
        outline-style: solid;
        outline-color: rgb(255 255 255 / 0.1);
        // outline-offset: 10px;
        outline-width: 1rem;
        border-radius: var(--radius);
    }
}

.show-more {
    //     border: none;
    //     text-decoration: underline;
    cursor: pointer;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    font-weight: 500;
}

.calendar {
    @media screen and (max-width: 576px) {
        display: none;
    }
}
</style>
