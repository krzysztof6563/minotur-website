const SRCSET_WIDTHS = "300;640;960;1280;1600";

const avifSrcsets = import.meta.glob("./**/*.webp", {
    eager: true,
    import: "default",
    query: { format: "avif", as: "srcset", w: SRCSET_WIDTHS },
});
const webpSrcsets = import.meta.glob("./**/*.webp", {
    eager: true,
    import: "default",
    query: { format: "webp", as: "srcset", w: SRCSET_WIDTHS },
});
const fallbackSrcs = import.meta.glob("./**/*.webp", {
    eager: true,
    import: "default",
    query: { w: "1600" },
});
const rawSrcs = import.meta.glob("./**/*.webp", { eager: true, import: "default" });

const stripQuery = (key) => key.split("?")[0];

const indexByBase = (modules) =>
    Object.fromEntries(Object.entries(modules).map(([key, value]) => [stripQuery(key), value]));

const avifByBase = indexByBase(avifSrcsets);
const webpByBase = indexByBase(webpSrcsets);
const fallbackByBase = indexByBase(fallbackSrcs);
const rawByBase = indexByBase(rawSrcs);

const toKey = (src) => {
    const cleanSrc = src.split("?")[0];
    const assetsPrefix = "/assets/images/";
    const prefixIndex = cleanSrc.indexOf(assetsPrefix);
    if (prefixIndex !== -1) {
        const relativePath = cleanSrc.slice(prefixIndex + assetsPrefix.length);
        return `./${relativePath}`;
    }
    const filename = cleanSrc.split("/").pop();
    return `./${filename}`;
};

export const getResponsiveImage = (src) => {
    const key = toKey(src);
    const avif = avifByBase[key];
    const webp = webpByBase[key];
    const fallback = fallbackByBase[key];
    const raw = rawByBase[key];

    return {
        avif,
        webp,
        src: fallback || raw || src,
    };
};
