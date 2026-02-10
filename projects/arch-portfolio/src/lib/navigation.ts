/**
 * Resolves a smart link object from Keystatic into a URL string.
 * Handles:
 * - Legacy string links (backwards compatibility)
 * - Custom external links
 * - Internal pages (/slug)
 * - Projects (/projects/slug)
 * - Services (/services/slug)
 */
export function resolveLink(link: any): string {
    // Handle null/undefined
    if (!link) return "#";

    // Handle legacy string links (from before the schema change)
    if (typeof link === "string") {
        return link;
    }

    // Handle new smart link object
    switch (link.discriminant) {
        case "custom":
            return link.value || "#";
        case "page":
            // Home page special case
            if (link.value === "home") return "/";
            return `/${link.value}`;
        case "project":
            return `/projects/${link.value}`;
        case "service":
            return `/services/${link.value}`;
        default:
            return "#";
    }
}
