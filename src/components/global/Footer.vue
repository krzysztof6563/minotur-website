<template>
    <footer>
        <div class="container">
            <div class="grid-2x">
                <div>
                    Copyright {{ new Date().getFullYear() }} @ Minotur - Chojnickie Stowarzyszenie Fantastyki i
                    Popkultury
                </div>
                <div class="text-right">Forged with ❤️ and many dice rolls</div>
            </div>
        </div>
    </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
footer {
    padding-block: 2rem;
    background: hsl(231.43deg 13.73% 5%);
}

.text-right {
    @media screen and (min-width: 992px) {
        text-align: right;
    }
}
</style>
