<template>
    <header>
        <div class="container">
            <div class="logo">
                <img :src="logoURL" alt="Minotur - Chojnickie Stowarzyszenie Fantastyki i Popkultury" id="logo" />
            </div>

            <nav id="main-menu">
                <ul>
                    <li><a href="#o-nas">O nas</a></li>
                    <li><a href="#wydarzenia">Wydarzenia</a></li>
                    <li><a href="#członkostwo">Członkostwo</a></li>
                    <li><a href="#kontakt">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import logoURL from "@/assets/logo.svg";
</script>

<style lang="scss" scoped>
header {
    padding-block: 1.25rem;
    background: hsl(231, 14%, 25%);
    color: white;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.logo {
    display: flex;
    align-items: center;

    #logo {
        height: 4rem;
        width: auto;
    }
}

nav {
    display: none;

    @media screen and (min-width: 768px) {
        display: block;
    }
    ul {
        display: flex;
        gap: 1rem;
    }

    li {
        list-style-type: none;
    }

    a {
        color: var(--accent);
        text-decoration: none;
    }
}
</style>
