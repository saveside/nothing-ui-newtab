import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureHttpPrefix(url: string) {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url
  }
  return `https://${url}`
}
