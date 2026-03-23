import { ViteSSG } from "vite-ssg";
import "./style.scss";
import App from "./App.vue";
import { routes } from "./router";

export const createApp = ViteSSG(App, {
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        }

        return { top: 0 };
    },
});
