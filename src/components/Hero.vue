<template>
    <div class="hero">
        <Picture src="/images/hero-stowarzyszenie-minotur.jpg" alt="Stowarzyszenie Minotur" class="w-100" />
        <div class="overlay">
            <div class="hero-text">
                <h1 style="color: white">
                    Minotur <br />
                    <span style="text-transform: lowercase; font-size: 0.9em">
                        Chojnickie Stowarzyszenie Fantastyki i Popkultury
                    </span>
                </h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import Picture from "./utilities/Picture.vue";
</script>

<style lang="scss">
.hero {
    position: relative;

    img {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 8;
        object-fit: cover;
        object-position: bottom;
    }

    .overlay {
        background: linear-gradient(to bottom, rgb(0 0 0 / 0), rgb(0 0 0 / 0.3) 30%, rgb(0 0 0 / 1));
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .hero-text {
            position: absolute;
            bottom: 5rem;
            left: 5rem;
            width: 80%;
            line-height: 1.2;

            h1::first-line {
                font-size: 1.75em;
            }
        }
    }
}
</style>
