import Home from "@/pages/Home.vue";
import NotFound from "@/pages/NotFound.vue";
import GalleryList from "@/pages/GalleryList.vue";
import { galleryRoutes } from "@/data/galleries";

export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/galeria",
        name: "GalleryList",
        component: GalleryList,
    },
    ...galleryRoutes,
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];
