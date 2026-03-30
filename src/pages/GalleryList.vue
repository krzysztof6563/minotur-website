<template>
    <section class="container section-pad">
        <h1 style="margin-top: 0; margin-bottom: 4rem">Galerie wydarzeń</h1>

        <div class="gallery-list-grid">
            <article v-for="gallery in galleries" :key="gallery.slug" class="gallery-card">
                <RouterLink :to="`/galeria/${gallery.slug}`" class="gallery-card-link">
                    <Picture
                        v-if="gallery.images?.length"
                        :src="gallery.images[0]"
                        :alt="gallery.title"
                        class="gallery-card-image w-100"
                        sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div class="gallery-card-body">
                        <h2>{{ gallery.title }}</h2>
                        <p v-if="gallery.description">{{ gallery.description }}</p>
                    </div>
                </RouterLink>
            </article>
        </div>
    </section>
</template>

<script setup>
import galleries from "@/data/galleries.json";
import Picture from "@/components/utilities/Picture.vue";
</script>

<style lang="scss">
.gallery-list-grid {
    img {
        width: 100%;
        height: auto;
        aspect-ratio: 3/2;
        object-fit: cover;
    }
}
</style>
<style lang="scss" scoped>
.gallery-list-header {
    margin-bottom: 2rem;
}

.gallery-list-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;

    @media screen and (min-width: 576px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 992px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    img {
        width: 100%;
        height: auto;
    }
}

.gallery-card {
    border-radius: 0.8rem;
    overflow: hidden;
    background: hsl(231, 14%, 18%);
    box-shadow: 0 12px 30px rgb(0 0 0 / 0.2);
}

.gallery-card-link {
    display: grid;
    color: inherit;
    text-decoration: none;
}

.gallery-card-image {
    width: 100%;
    height: auto;
}

.gallery-card-body {
    padding: 1.5rem;
    display: grid;
    gap: 0.5rem;
}
</style>
