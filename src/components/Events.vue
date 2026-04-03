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
                                        <td class="event-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM11 13V17H6V13H11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"
                                                ></path>
                                            </svg>
                                        </td>
                                        <td>{{ formatEventDate(event.date) }}</td>
                                    </tr>
                                    <tr>
                                        <td class="event-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M4 6.14286V18.9669L9.06476 16.7963L15.0648 19.7963L20 17.6812V4.85714L21.303 4.2987C21.5569 4.18992 21.8508 4.30749 21.9596 4.56131C21.9862 4.62355 22 4.69056 22 4.75827V19L15 22L9 19L2.69696 21.7013C2.44314 21.8101 2.14921 21.6925 2.04043 21.4387C2.01375 21.3765 2 21.3094 2 21.2417V7L4 6.14286ZM16.2426 11.2426L12 15.4853L7.75736 11.2426C5.41421 8.89949 5.41421 5.10051 7.75736 2.75736C10.1005 0.414214 13.8995 0.414214 16.2426 2.75736C18.5858 5.10051 18.5858 8.89949 16.2426 11.2426ZM12 12.6569L14.8284 9.82843C16.3905 8.26633 16.3905 5.73367 14.8284 4.17157C13.2663 2.60948 10.7337 2.60948 9.17157 4.17157C7.60948 5.73367 7.60948 8.26633 9.17157 9.82843L12 12.6569Z"
                                                ></path>
                                            </svg>
                                        </td>
                                        <td>
                                            {{ event.location }}<br />
                                            {{ event.address }}
                                        </td>
                                    </tr>
                                    <tr v-if="event.eventLink">
                                        <td class="event-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M18.3638 15.5355L16.9496 14.1213L18.3638 12.7071C20.3164 10.7545 20.3164 7.58866 18.3638 5.63604C16.4112 3.68341 13.2453 3.68341 11.2927 5.63604L9.87849 7.05025L8.46428 5.63604L9.87849 4.22182C12.6122 1.48815 17.0443 1.48815 19.778 4.22182C22.5117 6.95549 22.5117 11.3876 19.778 14.1213L18.3638 15.5355ZM15.5353 18.364L14.1211 19.7782C11.3875 22.5118 6.95531 22.5118 4.22164 19.7782C1.48797 17.0445 1.48797 12.6123 4.22164 9.87868L5.63585 8.46446L7.05007 9.87868L5.63585 11.2929C3.68323 13.2455 3.68323 16.4113 5.63585 18.364C7.58847 20.3166 10.7543 20.3166 12.7069 18.364L14.1211 16.9497L15.5353 18.364ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"
                                                ></path>
                                            </svg>
                                        </td>
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
import plLocale from "@fullcalendar/core/locales/pl";
import { computed, ref } from "vue";
import events from "../data/events.json";

const parseEventDate = (dateString) => new Date(dateString.replace(" ", "T"));
const formatEventDate = (dateString) => parseEventDate(dateString).toLocaleString();

const upcomingEvents = computed(() => {
    const now = new Date();
    const filteredEvents = events.filter((event) => {
        const cutoff = parseEventDate(event.date);
        cutoff.setDate(cutoff.getDate() + 1);
        return now < cutoff;
    });

    return filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
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

.event-icon svg {
    width: auto;
    height: 1.5em;

    path {
        fill: #59adf9;
    }
}
</style>
