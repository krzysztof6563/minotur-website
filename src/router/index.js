import galleries from "../data/galleries.json" with { type: "json" };
import { events } from "../helpers/events.js";

const galleryRoutes = galleries.map((gallery) => ({
    path: `/galeria/${gallery.slug}`,
    name: `Gallery-${gallery.slug}`,
    component: () => import("../pages/Gallery.vue"),
    props: { slug: gallery.slug },
}));

const eventRoutes = events.map((event) => ({
    path: `/wydarzenie/${event.slug}`,
    name: `Event-${event.slug}`,
    component: () => import("../pages/Event.vue"),
    props: { slug: event.slug },
}));

export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../pages/Home.vue"),
    },
    {
        path: "/galeria",
        name: "GalleryList",
        component: () => import("../pages/GalleryList.vue"),
    },
    ...galleryRoutes,
    ...eventRoutes,
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../pages/NotFound.vue"),
    },
];
