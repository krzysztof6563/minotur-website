import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const galleriesJsonPath = path.join(rootDir, "src/data/galleries.json");
const galleriesDirPath = path.join(rootDir, "src/assets/images/galleries");
const galleryImageBasePath = "/assets/images/galleries";
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const acronymMap = new Map([["rpg", "RPG"]]);

function formatTitleFromSlug(slug) {
    const parts = slug
        .split(/[-_]+/)
        .filter(Boolean)
        .map((part) => part.trim());

    return parts
        .map((part, index) => {
            if (/^\d+$/.test(part) && index === parts.length - 1) {
                return `#${part}`;
            }

            const acronym = acronymMap.get(part.toLowerCase());

            if (acronym) {
                return acronym;
            }

            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        })
        .join(" ");
}

async function getGalleryImages(folderName) {
    const folderPath = path.join(galleriesDirPath, folderName);
    const entries = await readdir(folderPath, { withFileTypes: true });

    return entries
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
        .map((fileName) => `${galleryImageBasePath}/${folderName}/${fileName}`);
}

async function getFolderTimestamp(folderName) {
    const folderPath = path.join(galleriesDirPath, folderName);
    const folderStats = await stat(folderPath);

    if (folderStats.birthtimeMs > 0) {
        return folderStats.birthtimeMs;
    }

    return Math.min(folderStats.mtimeMs, folderStats.ctimeMs);
}

async function main() {
    const galleriesJson = await readFile(galleriesJsonPath, "utf8");
    const galleries = JSON.parse(galleriesJson);
    const existingSlugs = new Set(galleries.map((gallery) => gallery.slug));
    const folderEntries = await readdir(galleriesDirPath, { withFileTypes: true });
    const folderNames = folderEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    const folderTimestamps = new Map(
        await Promise.all(folderNames.map(async (folderName) => [folderName, await getFolderTimestamp(folderName)])),
    );
    const sortedFolderNames = [...folderNames].sort((left, right) => {
        const timestampDiff = folderTimestamps.get(left) - folderTimestamps.get(right);

        if (timestampDiff !== 0) {
            return timestampDiff;
        }

        return left.localeCompare(right, undefined, { numeric: true });
    });

    const missingFolders = sortedFolderNames.filter((folderName) => !existingSlugs.has(folderName));

    const newGalleries = await Promise.all(
        missingFolders.map(async (folderName) => ({
            slug: folderName,
            title: formatTitleFromSlug(folderName),
            description: "",
            images: await getGalleryImages(folderName),
        })),
    );

    if (newGalleries.length === 0) {
        console.log("No missing galleries found.");
        return;
    }

    const updatedGalleries = [...newGalleries.reverse(), ...galleries];
    const nextJson = `${JSON.stringify(updatedGalleries, null, 4)}\n`;

    await writeFile(galleriesJsonPath, nextJson, "utf8");

    console.log(`Added ${newGalleries.length} gallery entr${newGalleries.length === 1 ? "y" : "ies"}:`);

    for (const gallery of newGalleries) {
        console.log(`- ${gallery.slug} -> ${gallery.title} (${gallery.images.length} images)`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
