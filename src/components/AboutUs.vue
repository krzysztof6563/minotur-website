<template>
    <section id="o-nas">
        <div class="container section-pad">
            <div class="grid-2x">
                <div class="about-us-text">
                    <h2>Ale czym właściwie jest Minotur?</h2>
                    <p>
                        <strong>Minotur</strong> <em>[mino-tur]</em> – mityczne stworzenie spotykane na ziemiach
                        pomorskich przy stołach z planszówkami, w salach erpegowych oraz przy klawiaturach i padach.
                        Jego głównymi składnikami odżywczymi są historie, pizza i kreatywna energia. Z natury
                        towarzyski, gromadzi wokół siebie pełno ludzi chcących szerzyć jego idee i wspólną zabawę.
                    </p>
                    <p>
                        W rzeczywistości <strong>Minotur</strong> to także stowarzyszenie zrzeszające miłośników
                        fantastyki, gier planszowych, RPG, popkultury oraz innych kreatywnych czynności. Organizujemy
                        spotkania i wydarzenia związane z powyższą tematyką ale i również inne atrakcje – wszystko po to
                        aby Chojnice i ich okolice byłym miejscem gdzie można miło i kreatywnie spędzić czas.
                    </p>
                    <p>
                        Naturalne środowisko Minotura znajduje się w dwóch miejscach. Wybierz jedną z ikon poniżej, aby
                        je odkryć.
                    </p>
                    <div class="d-flex logos">
                        <a href="https://www.facebook.com/minotur.chojnice" target="_blank" aria-label="Facebook">
                            <img :src="facebookSVG" alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com/minotur.chojnice" target="_blank" aria-label="Instagram">
                            <img :src="instagramSVG" alt="Instagram" />
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
