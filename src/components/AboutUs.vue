<template>
    <section id="o-nas">
        <div class="container section-pad">
            <div class="grid-2x">
                <div class="about-us-text">
                    <h2>Ale czym właściwie jest Minotur?</h2>
                    <p>
                        <strong>Minotur</strong> <em>[mino-tur]</em> – mityczne stworzenie spotykane najczęściej w
                        bibliotekach, przy stołach z planszówkami i w salach pełnych graczy RPG. Żywi się dobrą fabułą,
                        pizzą i kreatywną energią. Z natury towarzyski, gromadzi wokół siebie ludzi, którzy lubią
                        fantastykę, gry i wspólne tworzenie historii.
                    </p>
                    <p>
                        W rzeczywistości <strong>Minotur</strong> to także stowarzyszenie zrzeszające miłośników
                        fantastyki, gier planszowych, RPG, popkultury i kreatywnej rozrywki. Organizujemy spotkania,
                        sesje, wydarzenia i inne atrakcje – wszystko po to, żeby w Chojnicach i okolicy było więcej
                        miejsca na dobrą zabawę, wyobraźnię i wspólne przygody.
                    </p>
                    <p>
                        Naturalne środowisko Minotura znajduje się w dwóch miejscach. Wybierz jedną z ikon poniżej, aby
                        je odkryć.
                    </p>
                    <div class="d-flex logos">
                        <a href="https://www.facebook.com/minotur.chojnice" target="_blank">
                            <img :src="facebookSVG" alt="" />
                        </a>
                        <a href="https://www.facebook.com/minotur.chojnice" target="_blank">
                            <img :src="instagramSVG" alt="" />
                        </a>
                    </div>
                </div>
                <div>
                    <Picture src="/images/o-minoturze.jpg" class="w-100 rounded" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Picture from "@/components/utilities/Picture.vue";
import facebookSVG from "@/assets/Facebook_Logo_Primary.svg";
import instagramSVG from "@/assets/Instagram_Glyph_Gradient.svg";
</script>

<style lang="scss" scoped>
.logos {
    margin-top: 4rem;
    gap: 4rem;

    img {
        width: 6rem;
        height: auto;
    }
}

h2 {
    margin-bottom: 3rem;
}

.about-us-text {
    font-size: 1.2rem;
}
</style>
