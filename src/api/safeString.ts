/**
 * Ensure the string is safe from code injection. In other words make sure the
 * string will display exactly like this when it is transformed.
 *
 * @example
 *     safeString("<script>alert('Hello World!');</script>") => "&lt;script&gt;alert('Hello World!');&lt;/script&gt;"
 */
export function safeString(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

