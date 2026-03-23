<script setup>
const props = defineProps({
    onLinkClick: {
        type: Function,
        default: null,
    },
});
</script>

<template>
    <ul>
        <li><RouterLink to="/" @click="props.onLinkClick?.()">Strona główna</RouterLink></li>
        <li><RouterLink :to="{ path: '/', hash: '#o-nas' }" @click="props.onLinkClick?.()">O nas</RouterLink></li>
        <li>
            <RouterLink :to="{ path: '/', hash: '#wydarzenia' }" @click="props.onLinkClick?.()">
                Wydarzenia
            </RouterLink>
        </li>
        <li>
            <RouterLink :to="{ path: '/', hash: '#członkostwo' }" @click="props.onLinkClick?.()">
                Członkostwo
            </RouterLink>
        </li>
        <li>
            <RouterLink :to="{ name: 'GalleryList' }" @click="props.onLinkClick?.()"> Galeria </RouterLink>
        </li>
        <li>
            <RouterLink :to="{ path: '/', hash: '#kontakt' }" @click="props.onLinkClick?.()"> Kontakt </RouterLink>
        </li>
    </ul>
</template>
