<template>
    <section id="kontakt">
        <div class="container section-pad">
            <div class="grid-2x">
                <div style="max-width: 800px">
                    <h2>Skontaktuj się z nami</h2>
                    <p>
                        Masz pytanie? Chcesz dołączyć do stowarzyszenia, zorganizować wydarzenie albo po prostu
                        porozmawiać o fantastyce, RPG lub planszówkach?
                    </p>

                    <p>Najłatwiej złapać nas w jeden z poniższych sposobów:</p>

                    <ul>
                        <li>E-mail: <a href="mailto:kontakt@minotur.pl">kontakt@minotur.pl</a></li>
                        <li>Telefon: <a href="tel:+48697111731">+48 697 111 731</a></li>
                        <li>Social media – napisz do nas na Facebooku lub Instagramie</li>
                    </ul>

                    <p>Odpowiadamy najszybciej jak się da – chyba że akurat ktoś wpadł do galaretowatego sześcianu.</p>
                </div>
                <div>
                    <div class="card rounded">
                        <h3 style="margin-top: 0">Dane stowarzyszenia</h3>
                        <p>
                            <strong>Minotur - Chojnickie Stowarzyszenie Fantastyki i Popkultury</strong><br />
                            ul. Człuchowska 33/10<br />
                            89-600 Chojnice<br />
                        </p>
                        <p>
                            <strong>NIP</strong>: 5552147212<br />
                            <strong>REGON</strong>: 544193992<br />
                        </p>
                        <p>
                            <strong>Rachunek bankowy:</strong><br />
                            05 1020 1491 0000 4002 0137 0154
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.grid-2x {
    @media screen and (min-width: 992px) {
        grid-template-columns: 2fr 1fr;
    }
}
</style>
