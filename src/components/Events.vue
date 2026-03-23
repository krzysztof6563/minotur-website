<template>
    <section id="wydarzenia">
        <div class="container section-pad">
            <h2>Nadchodzące wydarzenia</h2>
            <div class="grid-2x">
                <div class="list" v-if="upcomingEvents.length > 0">
                    <div class="event" v-for="(event, index) in upcomingEvents" :key="event.name">
                        <h3 style="margin-top: 0">{{ event.name }}</h3>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Kiedy?</td>
                                        <td>{{ formatEventDate(event.date) }}</td>
                                    </tr>
                                    <tr>
                                        <td>Gdzie?</td>
                                        <td>
                                            {{ event.location }}<br />
                                            {{ event.address }}
                                        </td>
                                    </tr>
                                    <tr v-if="event.eventLink">
                                        <td>Link?</td>
                                        <td>
                                            <a :href="event.eventLink" target="_blank" rel="noopener noreferrer">
                                                Wydarzenie na Facebooku
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div
                                class="event-description"
                                :class="{ 'is-clamped': !isExpanded(index) }"
                                v-html="event.description"
                            ></div>
                            <button type="button" class="show-more btn btn-primary" @click="toggleExpanded(index)">
                                {{ isExpanded(index) ? "Zwiń" : "Pokaż więcej" }}
                            </button>
                        </div>
                        <hr />
                    </div>
                </div>
                <div class="empty" v-else>
                    <h3 style="margin-top: 0">Brak aktualnie zaplanowanych wydarzeń</h3>
                </div>
                <div class="calendar">
                    <FullCalendar :options="calendarOptions" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import plLocale from "@fullcalendar/core/locales/pl";
import { computed, ref } from "vue";
import events from "../data/events.json";

const parseEventDate = (dateString) => new Date(dateString.replace(" ", "T"));
const formatEventDate = (dateString) => parseEventDate(dateString).toLocaleString();

const upcomingEvents = computed(() => {
    const now = new Date();
    return events.filter((event) => {
        const cutoff = parseEventDate(event.date);
        cutoff.setDate(cutoff.getDate() + 1);
        return now < cutoff;
    });
});

const expandedIndices = ref(new Set());

const isExpanded = (index) => expandedIndices.value.has(index);

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
        };
    });
}

const calendarOptions = {
    plugins: [dayGridPlugin],
    initialView: "dayGridMonth",
    events: eventsToFullCalendar(),
    locale: plLocale,
};
</script>

<style lang="scss" scoped>
table {
    border-collapse: collapse;
    margin-bottom: 0.5rem;

    tr {
        td {
            vertical-align: top;
            padding-block: 0.25rem;

            &:first-child {
                font-weight: bold;
            }

            &:last-child {
                padding-left: 1rem;
            }
        }
    }
}

.grid-2x {
    @media screen and (min-width: 992px) {
        grid-template-columns: 2fr 4fr;
    }
}

.list {
    .event:last-of-type hr {
        display: none;
    }

    hr {
        margin-block: 1.75rem;
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

.show-more {
    //     border: none;
    //     text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5rem;
}
</style>
