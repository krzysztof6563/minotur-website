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

const base = import.meta.env.BASE_URL;
const srcPath = props.src.startsWith("/") ? props.src.slice(1) : props.src;
const toReplace = srcPath.endsWith(".jpg") ? ".jpg" : ".png";
const withBase = (path) => `${base}${path}`;

const URLjpg = withBase(srcPath);
const URLwebp = withBase(srcPath.replace(toReplace, ".webp"));
const URLavif = withBase(srcPath.replace(toReplace, ".avif"));
</script>
