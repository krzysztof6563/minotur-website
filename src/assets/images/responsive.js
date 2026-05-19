const isDev = import.meta.env.DEV;

const rawSrcs = import.meta.glob("./**/*.webp", { eager: true, import: "default" });
const avifGlobalSrcsets = isDev
    ? {}
    : import.meta.glob(["./**/*.webp", "!./galleries/**/*.webp"], {
          eager: true,
          import: "default",
          query: { format: "avif", as: "srcset", w: "300;640;960;1280;1600" },
      });
const avifGallerySrcsets = isDev
    ? {}
    : import.meta.glob("./galleries/**/*.webp", {
          eager: true,
          import: "default",
          query: { format: "avif", as: "srcset", w: "320;640" },
      });
const webpGlobalSrcsets = isDev
    ? {}
    : import.meta.glob(["./**/*.webp", "!./galleries/**/*.webp"], {
          eager: true,
          import: "default",
          query: { format: "webp", as: "srcset", w: "300;640;960;1280;1600" },
      });
const webpGallerySrcsets = isDev
    ? {}
    : import.meta.glob("./galleries/**/*.webp", {
          eager: true,
          import: "default",
          query: { format: "webp", as: "srcset", w: "320;640" },
      });
const fallbackGlobalSrcs = isDev
    ? {}
    : import.meta.glob(["./**/*.webp", "!./galleries/**/*.webp"], {
          eager: true,
          import: "default",
          query: { w: "1600" },
      });
const fallbackGallerySrcs = {};

const stripQuery = (key) => key.split("?")[0];

const indexByBase = (modules) =>
    Object.fromEntries(Object.entries(modules).map(([key, value]) => [stripQuery(key), value]));

const avifByBase = indexByBase({ ...avifGlobalSrcsets, ...avifGallerySrcsets });
const webpByBase = indexByBase({ ...webpGlobalSrcsets, ...webpGallerySrcsets });
const fallbackByBase = indexByBase({ ...fallbackGlobalSrcs, ...fallbackGallerySrcs });
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
        avif: isDev ? undefined : avif,
        webp: isDev ? undefined : webp,
        src: fallback || raw || src,
    };
};
