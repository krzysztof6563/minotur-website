<template>
    <div class="container">
        <h1>{{ event.name }}</h1>

        <div class="event-grid">
            <div>
                <EventTable :event="event" />
            </div>
            <div v-html="event.description"></div>
        </div>
    </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";
import { seoDefaults, usePageSeo } from "@/composables/usePageSeo";
import EventTable from "../components/EventTable.vue";
import { events, parseEventDate } from "../helpers/events";

const props = defineProps({
    slug: String,
});

const event = events.find((el) => el.slug === props.slug);
const eventUrl = `${seoDefaults.siteUrl}/wydarzenie/${props.slug}`;
const fallbackDescription = "Szczegóły wydarzenia organizowanego przez stowarzyszenie Minotur w Chojnicach.";
const eventJsonLd = event
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: parseEventDate(event.date).toISOString(),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        description: event.description,
        url: eventUrl,
        location: {
            "@type": "Place",
            name: event.location,
            address: event.address,
        },
        organizer: {
            "@type": "Organization",
            name: seoDefaults.siteName,
            url: seoDefaults.siteUrl,
        },
        ...(event.eventLink ? { sameAs: event.eventLink } : {}),
    }
    : null;

usePageSeo({
    title: event ? `${event.name} - Wydarzenia Minotura` : "Wydarzenie - Minotur",
    description: event?.description ?? fallbackDescription,
    path: `/wydarzenie/${props.slug}`,
    type: "article",
});

if (eventJsonLd) {
    useHead({
        script: [
            {
                type: "application/ld+json",
                key: "event-jsonld",
                textContent: JSON.stringify(eventJsonLd),
            },
        ],
    });
}
</script>

<style lang="scss" scoped>
.event-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media screen and (min-width: 576px) {
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 2fr;
        gap: 6rem;
    }
}

.container {
    padding-block: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}
</style>
