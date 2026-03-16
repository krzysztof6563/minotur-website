<template>
    <section id="wydarzenia">
        <div class="container section-pad">
            <h2>Nadchodzące wydarzenia</h2>
            <div class="grid-2x">
                <div class="list" v-if="events.length > 0">
                    <div class="event" v-for="event in events">
                        <h3 style="margin-top: 0">{{ event.name }}</h3>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Kiedy?</td>
                                        <td>{{ new Date(event.date).toLocaleDateString() }}</td>
                                    </tr>
                                    <tr>
                                        <td>Gdzie?</td>
                                        <td>
                                            {{ event.location }}<br />
                                            {{ event.address }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>{{ event.description }}</p>
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
import events from "../data/events.json";

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
</style>
