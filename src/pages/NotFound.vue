<template>
    <section class="not-found">
        <div
            class="container"
            style="
                text-align: center;
                padding-block: 4rem;
                display: flex;
                align-items: center;
                flex-direction: column;
                height: 100%;
            "
        >
            <h1>404</h1>
            <p style="text-align: center">Nie znaleziono strony.</p>
            <RouterLink to="/">Wróć na stronę główną</RouterLink>
        </div>
    </section>
</template>

<script setup>
import { usePageSeo } from "@/composables/usePageSeo";

usePageSeo({
    title: "404 - Nie znaleziono strony | Minotur",
    description: "Strona, której szukasz, nie istnieje lub została przeniesiona.",
    robots: "noindex, nofollow",
});
</script>
