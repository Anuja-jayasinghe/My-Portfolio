/**
 * Utility to ensure image paths are served as WebP or AVIF if possible.
 * Replaces .png, .jpg, .jpeg with .webp extension.
 */
export function getOptimizedImagePath(path: string | undefined): string {
  if (!path) return "";
  
  // Only replace common static asset types
  return path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
}
