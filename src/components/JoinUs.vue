<template>
    <section id="członkostwo">
        <div class="container section-pad">
            <h2>Dołącz do nas!</h2>
            <div class="grid-2x">
                <div class="left">
                    <Picture :src="img" alt="Dołącz do Minotura" class="w-100 rounded" />
                </div>

                <div class="right" style="display: flex; flex-direction: column; justify-content: center">
                    <p>
                        <span style="font-weight: bold; font-size: 1.5em">Chcesz zostać częścią Minotura?</span
                        ><br /><br />
                        Jeśli fantastyka, gry, popkultura i wspólne tworzenie wydarzeń są Ci bliskie, zapraszamy do
                        naszego stowarzyszenia.
                    </p>

                    <p>Dołączenie jest proste:</p>
                    <ol style="margin-top: 0">
                        <li>Zapoznaj się z regulaminem stowarzyszenia.</li>
                        <li>Pobierz i wypełnij deklarację członkowską.</li>
                        <li>Uzupełnij wymaganą klauzule RODO.</li>
                        <li>
                            Wyślij komplet dokumentów na adres:
                            <a href="mailto:kontakt@minotur.pl">kontakt@minotur.pl</a>
                        </li>
                    </ol>

                    <p>Po otrzymaniu dokumentów odezwiemy się do Ciebie z informacją o dalszych etapach.</p>

                    <p style="color: white">Pobierz dokumenty:</p>
                    <div class="buttons" style="display: flex; gap: 1rem">
                        <a class="btn btn-primary" :href="statueLink" target="_blank">regulamin stowarzyszenia</a>
                        <a class="btn btn-primary" :href="declarationLink">deklaracja członkowska</a>
                        <a class="btn btn-primary" :href="rodoLink" target="_blank">klauzula RODO</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Picture from "./utilities/Picture.vue";
import img from "../assets/dolacz-do-nas.jpg";
import statueLink from "@/assets/files/01_Regulamin_Stowarzyszenia.pdf";
import declarationLink from "@/assets/files/02_Deklaracja_członkowska.pdf";
import rodoLink from "@/assets/files/02_Klauzula_RODO.pdf";
</script>

<style lang="scss" scoped></style>
