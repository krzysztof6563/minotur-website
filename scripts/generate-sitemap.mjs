import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { routes } from "../src/router/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");
const cnamePath = path.join(publicDir, "CNAME");
const outputPath = path.join(distDir, "sitemap.xml");
const buildTimestamp = new Date();

function normalizeSiteUrl(siteUrl) {
    const value = siteUrl.trim();

    if (!value) {
        throw new Error("Site URL is empty.");
    }

    const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;

    return withProtocol.replace(/\/+$/, "");
}

function formatLastMod(date) {
    return date.toISOString();
}

function isSitemapRoute(route) {
    return route.path && !route.path.includes(":");
}

function buildUrlEntry(siteUrl, routePath, lastmod) {
    const location = routePath === "/" ? siteUrl : `${siteUrl}${routePath}`;

    return [
        "  <url>",
        `    <loc>${location}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        "  </url>",
    ].join("\n");
}

async function main() {
    const cname = await readFile(cnamePath, "utf8");
    const siteUrl = normalizeSiteUrl(process.env.SITE_URL ?? cname);
    const lastmod = formatLastMod(buildTimestamp);
    const routePaths = [...new Set(routes.filter(isSitemapRoute).map((route) => route.path))]
        .sort((left, right) => left.localeCompare(right));

    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...routePaths.map((routePath) => buildUrlEntry(siteUrl, routePath, lastmod)),
        "</urlset>",
        "",
    ].join("\n");

    await mkdir(distDir, { recursive: true });
    await writeFile(outputPath, sitemap, "utf8");

    console.log(`Generated sitemap: ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
