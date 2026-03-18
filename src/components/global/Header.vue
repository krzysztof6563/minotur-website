<template>
    <header>
        <div class="container">
            <div class="logo">
                <img :src="logoURL" alt="Minotur - Chojnickie Stowarzyszenie Fantastyki i Popkultury" id="logo" />
            </div>

            <button class="menu-toggle" :class="{ open: isMenuOpen }" type="button" :aria-expanded="isMenuOpen"
                aria-controls="mobile-menu" @click="toggleMenu">
                <span class="sr-only">Otwórz menu</span>
                <span aria-hidden="true" class="menu-icon"></span>
            </button>

            <nav id="main-menu">
                <ul>
                    <li><a href="#o-nas">O nas</a></li>
                    <li><a href="#wydarzenia">Wydarzenia</a></li>
                    <li><a href="#członkostwo">Członkostwo</a></li>
                    <li><a href="#kontakt">Kontakt</a></li>
                </ul>
            </nav>
        </div>

        <div class="menu-scrim" :class="{ open: isMenuOpen }" @click="closeMenu"></div>

        <nav id="mobile-menu" class="mobile-menu" :class="{ open: isMenuOpen }" aria-label="Menu mobilne">
            <button class="menu-close" type="button" @click="closeMenu">
                <span class="sr-only">Zamknij menu</span>
                <span aria-hidden="true" class="close-icon"></span>
            </button>
            <ul>
                <li><a href="#o-nas" @click="closeMenu">O nas</a></li>
                <li><a href="#wydarzenia" @click="closeMenu">Wydarzenia</a></li>
                <li><a href="#członkostwo" @click="closeMenu">Członkostwo</a></li>
                <li><a href="#kontakt" @click="closeMenu">Kontakt</a></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import logoURL from "@/assets/logo.svg";
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};
</script>

<style lang="scss" scoped>
header {
    padding-block: 0.5rem;
    background: hsl(231, 14%, 25%);
    color: white;
    position: relative;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.logo {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-family: var(--headingFont);
    font-size: 1.2em;
    font-weight: 700;
    color: var(--accent);

    #logo {
        height: 6rem;
        width: auto;
    }
}

#main-menu {
    display: none;

    @media screen and (min-width: 768px) {
        display: block;
    }
    ul {
        display: flex;
        gap: 2rem;
        font-size: 1.2em;
        font-weight: 500;
    }

    li {
        list-style-type: none;
    }

    a {
        color: var(--accent);
        text-decoration: none;

        &:hover {
            text-shadow: 2px 2px 2px rgb(128 128 128 / 0.75);
        }
    }
}

.menu-toggle {
    border: none;
    background: transparent;
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    color: var(--accent);

    @media screen and (min-width: 768px) {
        display: none;
    }
}

.menu-icon {
    width: 1.6rem;
    height: 2px;
    background: currentColor;
    position: relative;
    display: inline-block;
    transition: transform 0.2s ease;

    &::before,
    &::after {
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: currentColor;
        transition: transform 0.2s ease, top 0.2s ease;
    }

    &::before {
        top: -0.45rem;
    }

    &::after {
        top: 0.45rem;
    }
}

.menu-toggle.open {
    .menu-icon {
        background: transparent;
    }

    .menu-icon::before {
        top: 0;
        transform: rotate(45deg);
    }

    .menu-icon::after {
        top: 0;
        transform: rotate(-45deg);
    }
}

.menu-close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 3rem;
    height: 3rem;
    border: none;
    background: transparent;
    display: grid;
    place-items: center;
    color: var(--accent);
}

.close-icon {
    width: 1.6rem;
    height: 2px;
    background: transparent;
    position: relative;
    display: inline-block;
}

.close-icon::before,
.close-icon::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
}

.close-icon::before {
    transform: rotate(45deg);
}

.close-icon::after {
    transform: rotate(-45deg);
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.menu-scrim {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    z-index: 10;

    &.open {
        opacity: 1;
        pointer-events: auto;
    }
}

.mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: min(78vw, 20rem);
    height: 100vh;
    padding: 6rem 2rem 2rem;
    background: hsl(231, 14%, 18%);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 20;

    &.open {
        transform: translateX(0);
    }

    ul {
        list-style: none;
        display: grid;
        gap: 1.5rem;
        font-size: 1.3em;
        font-weight: 600;
    }

    a {
        color: var(--accent);
        text-decoration: none;
    }

    @media screen and (min-width: 768px) {
        display: none;
    }
}
</style>
