<template>
    <picture>
        <source v-if="image.avif" :srcset="image.avif" type="image/avif" :sizes="sizesAttr" />
        <source v-if="image.webp" :srcset="image.webp" type="image/webp" :sizes="sizesAttr" />
        <img
            :src="image.src"
            :alt="props.alt"
            :class="class"
            :loading="props.loading"
            :decoding="props.decoding"
            :fetchpriority="props.fetchpriority"
            :sizes="sizesAttr"
        />
    </picture>
</template>

<script setup>
import { computed } from "vue";
import { getResponsiveImage } from "@/assets/images/responsive";

const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    class: { type: String, default: "" },
    sizes: { type: String, default: "" },
    loading: { type: String, default: "lazy" },
    decoding: { type: String, default: "async" },
    fetchpriority: { type: String, default: "auto" },
});

const sizesAttr = props.sizes || undefined;
const image = computed(() => getResponsiveImage(props.src));
</script>
