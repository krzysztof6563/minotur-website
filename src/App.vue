<script setup>
import Footer from "./components/global/Footer.vue";
import Header from "./components/global/Header.vue";
</script>

<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>
