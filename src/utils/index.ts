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

export function checkUrlPrefix(query: string) {
  return (
    query.startsWith("https://") ||
    query.startsWith("www.") ||
    query.startsWith("http://")
  )
}

export function getDomain(url: string) {
  // Remove 'http://' or 'https://' and 'www.' if present
  return url.replace(/^(https?:\/\/)?(www\.)?/, "")
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export function b64toBlob(b64Data: string, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data.split(",")[1])
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export function base64ToBlob(
  base64: string,
  contentType = "",
  sliceSize = 512,
) {
  const byteCharacters = atob(base64.split(",")[1])
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export function blobToFile(blob: Blob, fileName: string) {
  const b: any = blob
  b.name = fileName
  b.lastModifiedDate = new Date()
  return b as File
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function areObjectsEqual<T extends Record<string, any>>(
  obj1: T,
  obj2: T,
  keysToIgnore?: string[],
): boolean {
  const filteredKeys = keysToIgnore
    ? Object.keys(obj1).filter((key) => !keysToIgnore.includes(key))
    : Object.keys(obj1)

  return filteredKeys.every((key) => obj1[key] === obj2[key])
}
