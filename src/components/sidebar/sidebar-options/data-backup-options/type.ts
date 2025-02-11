import type { ImageFile } from "~/types"

export type Base64ImageFile = Omit<ImageFile, "file"> & { file: string }

export type Backup = {
  "data-theme": string | null
  "backup-code": string
  date: number
  "gallery-images": Base64ImageFile[] | null
  "app-store": string
  "query-history": string | null
  "search-engines": string | null
  icons: { key: string; value: string | null }[] | null
  "nothing-newtab-options": string
}
