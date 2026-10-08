<template>
    <div class="chip-wrap" v-if="event.hasOwnProperty('tags') && Array.isArray(event.tags)">
        <div class="chip" v-for="tag in event.tags">{{ tag }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
    event: Object,
});

const event = props.event;
</script>

<style lang="scss" scoped>
.chip-wrap {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-block: 0.5rem 0.75rem;
}

.chip {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    color: white;
    background: var(--accent-border);
    border-radius: 4px;
}
</style>
