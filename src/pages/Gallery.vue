<template>
    <section class="container section-pad start">
        <div style="margin-bottom: 4rem">
            <h1>{{ gallery?.title }}</h1>
            <p v-if="gallery?.description" v-html="gallery.description" style="max-width: unset"></p>
        </div>

        <div v-if="gallery?.images?.length" class="gallery-grid">
            <button
                v-for="(image, index) in gallery.images"
                :key="image"
                type="button"
                class="gallery-item"
                @click="openLightbox(index)"
            >
                <Picture
                    :src="image"
                    :alt="gallery.title"
                    class="gallery-image w-100 gallery-img rounded"
                    sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 100vw"
                />
            </button>
        </div>
        <p v-else>Brak zdjęć w tej galerii.</p>

        <VueEasyLightbox
            :visible="lightboxVisible"
            :imgs="lightboxImages"
            :index="lightboxIndex"
            @hide="lightboxVisible = false"
        >
            <template #toolbar></template>
        </VueEasyLightbox>
    </section>
</template>

<script setup>
import { computed, ref } from "vue";
import galleries from "@/data/galleries.json";
import Picture from "@/components/utilities/Picture.vue";
import { getResponsiveImage } from "@/assets/images/responsive";
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps({
    slug: { type: String, required: true },
});

const gallery = computed(() => galleries.find((item) => item.slug === props.slug));
const lightboxVisible = ref(false);
const lightboxIndex = ref(0);
const lightboxImages = computed(() => (gallery.value?.images ?? []).map((src) => getResponsiveImage(src).src));

const openLightbox = (index) => {
    lightboxIndex.value = index;
    lightboxVisible.value = true;
};
</script>

<style lang="scss" scoped>
.gallery-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 2rem;
}

.gallery-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.gallery-item {
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
}

.gallery-image {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
}
</style>
