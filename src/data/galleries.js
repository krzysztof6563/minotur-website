import galleries from "./galleries.json";

export { galleries };

export const galleryRoutes = galleries.map((gallery) => ({
    path: `/galeria/${gallery.slug}`,
    name: `Gallery-${gallery.slug}`,
    component: () => import("@/pages/Gallery.vue"),
    props: { slug: gallery.slug },
}));
