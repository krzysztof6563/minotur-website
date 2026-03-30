import galleries from "../data/galleries.json" with { type: "json" };

const galleryRoutes = galleries.map((gallery) => ({
    path: `/galeria/${gallery.slug}`,
    name: `Gallery-${gallery.slug}`,
    component: () => import("../pages/Gallery.vue"),
    props: { slug: gallery.slug },
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
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../pages/NotFound.vue"),
    },
];
