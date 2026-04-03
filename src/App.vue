<script setup>
import { onMounted, onUnmounted } from "vue";
import { useHead } from "@unhead/vue";
import Footer from "./components/global/Footer.vue";
import Header from "./components/global/Header.vue";

const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

let keyBuffer = [];

function handleKeydown(event) {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

    keyBuffer.push(key);
    keyBuffer = keyBuffer.slice(-konamiCode.length);

    if (keyBuffer.join("|") === konamiCode.join("|")) {
        document.documentElement.classList.toggle("invert-mode");
        keyBuffer = [];
    }
}

useHead({
    htmlAttrs: {
        lang: "pl",
    },
});

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>
