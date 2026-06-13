export const CLOUDINARY_CLOUD =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "demo";

export function cloudinaryVideoUrl(
  publicId: string,
  options?: { quality?: string; format?: string }
) {
  const q = options?.quality ?? "auto";
  const f = options?.format ?? "auto";
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/f_${f},q_${q}/${publicId}`;
}

export function cloudinaryImageUrl(
  publicId: string,
  width?: number
) {
  const transforms = width ? `w_${width},f_auto,q_auto` : "f_auto,q_auto";
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${transforms}/${publicId}`;
}
