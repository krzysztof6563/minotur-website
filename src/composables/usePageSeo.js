import { useHead } from "@unhead/vue";

const SITE_NAME = "Stowarzyszenie Minotur";
const SITE_URL = "https://minotur.pl";
const DEFAULT_TITLE = "Minotur - RPG, fantasy i popkultura w Chojnicach";
const DEFAULT_DESCRIPTION =
    "RPG, fantasy i popkultura w Chojnicach. Minotur to społeczność, spotkania i wydarzenia dla ludzi z zajawką - niezależnie od doświadczenia.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function resolveValue(value) {
    return typeof value === "function" ? value() : value;
}

function absoluteUrl(path = "/") {
    return new URL(path, SITE_URL).toString();
}

function stripHtml(value = "") {
    return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function usePageSeo({
    title,
    description,
    path = "/",
    image = DEFAULT_IMAGE,
    type = "website",
    robots,
} = {}) {
    useHead(() => {
        const resolvedTitle = resolveValue(title) ?? DEFAULT_TITLE;
        const resolvedDescription = stripHtml(resolveValue(description) ?? DEFAULT_DESCRIPTION);
        const resolvedPath = resolveValue(path) ?? "/";
        const resolvedImage = absoluteUrl(resolveValue(image) ?? DEFAULT_IMAGE);
        const canonicalUrl = absoluteUrl(resolvedPath);

        return {
            title: resolvedTitle,
            link: [
                {
                    rel: "canonical",
                    href: canonicalUrl,
                },
            ],
            meta: [
                {
                    name: "description",
                    content: resolvedDescription,
                },
                {
                    property: "og:site_name",
                    content: SITE_NAME,
                },
                {
                    property: "og:title",
                    content: resolvedTitle,
                },
                {
                    property: "og:description",
                    content: resolvedDescription,
                },
                {
                    property: "og:url",
                    content: canonicalUrl,
                },
                {
                    property: "og:type",
                    content: type,
                },
                {
                    property: "og:image",
                    content: resolvedImage,
                },
                {
                    name: "twitter:card",
                    content: "summary_large_image",
                },
                {
                    name: "twitter:title",
                    content: resolvedTitle,
                },
                {
                    name: "twitter:description",
                    content: resolvedDescription,
                },
                {
                    name: "twitter:image",
                    content: resolvedImage,
                },
                ...(robots
                    ? [
                          {
                              name: "robots",
                              content: robots,
                          },
                      ]
                    : []),
            ],
        };
    });
}

export const seoDefaults = {
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    defaultTitle: DEFAULT_TITLE,
    defaultDescription: DEFAULT_DESCRIPTION,
    defaultImage: DEFAULT_IMAGE,
};
