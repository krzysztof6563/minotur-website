<script setup>
import { useHead } from "@unhead/vue";
import Footer from "./components/global/Footer.vue";
import Header from "./components/global/Header.vue";

useHead({
    htmlAttrs: {
        lang: "pl",
    },
});
</script>

<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>
