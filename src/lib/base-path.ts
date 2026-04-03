/**
 * Base path for the Next.js app, used when constructing asset URLs
 * outside of Next.js <Image> and <Link> components (which handle
 * basePath automatically).
 *
 * This reads from next.config.ts basePath at build time via the
 * NEXT_PUBLIC_BASE_PATH env variable. For local dev (no env set)
 * this defaults to ''.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
