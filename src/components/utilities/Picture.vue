<template>
    <picture>
        <source :srcset="URLavif" type="image/avif" />
        <source :srcset="URLwebp" type="image/webp" />
        <img :src="URLjpg" :alt="props.alt" :class="class" />
    </picture>
</template>

<script setup>
const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    class: { type: String, default: "" },
});

let URLjpg = props.src;
let toReplace = props.src.endsWith(".jpg") ? ".jpg" : ".png";
let URLwebp = props.src.replace(toReplace, ".webp");
let URLavif = props.src.replace(toReplace, ".avif");
</script>
