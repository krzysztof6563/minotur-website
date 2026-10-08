<template>
    <div class="hero">
        <Picture src="/assets/images/hero-stowarzyszenie-minotur.webp" alt="Stowarzyszenie Minotur" class="w-100"
            sizes="100vw" loading="eager" fetchpriority="high" />
        <div class="overlay">
            <div class="bottom-wrap">
                <div class="hero-text">
                    <h1 style="color: white">
                        RPG, planszówki i fantastyka w Chojnicach <br />
                        <span style="text-transform: lowercase">
                            Gramy, organizujemy wydarzenia i budujemy lokalną społeczność fanów fantastyki i popkultury.
                        </span>
                    </h1>
                </div>
                <!-- <div class="nearest-event-wrap" v-if="nearestEvent">
                    <div class="nearest-event">
                        <span class="text-uppercase top-title">Najbliższe wydarzenie</span><br />
                        <div class="event-data">
                            <div v-html="formatShortDate(nearestEvent.date)"></div>
                            <div class="title">{{ nearestEvent.name }}</div>
                        </div>
                        <div style="display: flex; justify-content: center;">
                            <EventChips :event="nearestEvent" />
                        </div>
                        <RouterLink :to="`/wydarzenie/${nearestEvent.slug}`" class="btn btn-primary">Zobacz</RouterLink>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import Picture from "./utilities/Picture.vue";
import EventChips from "@/components/EventChips.vue";
import { upcomingEvents, parseEventDate } from "@/helpers/events.js"

let nearestEvent = Array.isArray(upcomingEvents) && upcomingEvents.length > 0 ? upcomingEvents[0] : null;

let formatShortDate = (date) => {
    const d = new Date(date);

    const day = new Intl.DateTimeFormat("pl-PL", {
        day: "2-digit",
    }).format(d);

    const month = new Intl.DateTimeFormat("pl-PL", {
        month: "short",
    }).format(d).replace(".", "").toUpperCase();

    return `${day}<br> ${month}`;
}

</script>

<style lang="scss">
.hero {
    position: relative;

    img {
        width: 100%;
        height: auto;
        aspect-ratio: 2 / 3;
        object-fit: cover;
        object-position: bottom;

        @media screen and (min-width: 768px) {
            aspect-ratio: 5 / 4.5;
        }

        @media screen and (min-width: 1200px) {
            aspect-ratio: 16 / 7.5;
        }
    }

    .overlay {
        background: linear-gradient(to bottom, rgb(0 0 0 / 0), rgb(0 0 0 / 0.3) 30%, rgb(0 0 0 / 1));
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;


        .bottom-wrap {
            position: absolute;
            bottom: 1.5rem;
            left: 1rem;
            width: 80%;
            line-height: 1.2;
            display: grid;
            grid-template-columns: 2fr 1fr;

            @media screen and (min-width: 992px) {
                bottom: 4rem;
                left: 5rem;
            }

            // h1::first-line {
            //     font-size: 1.75em;
            // }
        }

        .nearest-event-wrap {
            display: flex;
            justify-content: flex-end;
        }

        .nearest-event {
            width: fit-content;
            padding: 1rem;
            margin-block: 26.8px;
            text-align: right;
            background: #21232c;
            border-radius: var(--border-radius);
            border: 1px solid #f2d38aaa;
            max-width: 300px;

            .event-data {
                display: grid;
                grid-template-columns: 1fr 3fr;
                gap: .75rem;
                width: fit-content;
                margin-block: 0rem 1rem;

                .title {
                    text-align: left;
                }

            }

            .top-title {
                text-align: center;
                display: block;
                font-weight: 600;
                word-wrap: wrap;
            }

            .btn {
                display: block;
                width: fit-content;
                font-size: .8rem;
                padding: .4rem .8rem;
                margin-inline: auto;
            }
        }
    }
}

h1 {
    font-size: 2.5rem;
    letter-spacing: 0;


    span {
        font-size: .5em;
        line-height: .8;
    }
}
</style>
