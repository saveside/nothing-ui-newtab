import { Icon } from "@iconify/react/dist/iconify.js"
import clsx from "clsx"
import * as idb from "idb-keyval"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import Button from "~/components/ui/button"
import Modal from "~/components/ui/modal"
import { base64ToBlob, blobToFile } from "~/utils"
import type { Backup } from "./type"

export default function Import() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [open, setOpen] = useState(false)
  const [backupFile, setBackupFile] = useState<Backup | null>(null)

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!files) return

    const bakFile = files[0]

    if (bakFile) {
      ;(async () => {
        const fileContent: Backup = JSON.parse(await bakFile.text())

        // Verifying if selected backup file is valid
        const backupCode = fileContent["backup-code"] || null

        if (!backupCode || backupCode !== btoa("nothing-ui-newtab")) {
          toast.error("Invalid backup file selected!")
          return
        }

        // If backup file is valid then proceed
        setOpen(true)
        setBackupFile(fileContent)
      })()
    }
  }, [files])

  useEffect(() => {
    !open && setFiles(null)
  }, [open])

  const tableData = useMemo(() => {
    return [
      { field: "Icons (iconify cache)", isCheck: !!backupFile?.icons },
      { field: "Images", isCheck: !!backupFile?.["gallery-images"] },
      { field: "Query History", isCheck: !!backupFile?.["query-history"] },
      {
        field: "Weather Location",
        isCheck: backupFile?.["nothing-newtab-options"].match(
          /"weatherLocation"\s*:\s*"([^"]+)"/,
        ),
      },
      {
        field: "Weather API",
        isCheck: backupFile?.["nothing-newtab-options"].match(
          /"weatherAPI"\s*:\s*"([^"]+)"/,
        ),
      },
    ]
  }, [backupFile])

  const restoreBackupHandler = async () => {
    // Index DB stuff
    const appStore = backupFile?.["app-store"]
    const galleryImages = backupFile?.["gallery-images"]

    appStore && (await idb.set("app-store", appStore))
    galleryImages &&
      (await idb.set(
        "gallery-images",
        galleryImages.map((img) => ({
          ...img,
          file: blobToFile(base64ToBlob(img.file, img.type), img.name),
        })),
      ))

    // Local Storage stuff
    const queryHistory = backupFile?.["query-history"]
    const searchEngines = backupFile?.["search-engines"]
    const newtabOpts = backupFile?.["nothing-newtab-options"]
    const icons = backupFile?.icons

    queryHistory && localStorage.setItem("query-history", queryHistory)
    searchEngines && localStorage.setItem("search-engines", searchEngines)
    newtabOpts && localStorage.setItem("nothing-newtab-options", newtabOpts)
    icons?.forEach(
      (icon, _) => icon.value && localStorage.setItem(icon.key, icon.value),
    )

    window.location.reload()
  }

  return (
    <>
      <input
        type="file"
        accept=".json"
        className="hidden"
        ref={ref}
        onChange={(e) => setFiles(e.target.files)}
      />
      <Button variant="secondary" onClick={() => ref.current?.click()}>
        <Icon icon="mdi:cloud-download-outline" fontSize={20} /> Import
      </Button>
      <Modal
        title="Restore Backup"
        description={
          backupFile?.date
            ? `Created on ${new Date(backupFile.date).toLocaleString()}`
            : ""
        }
        isOpen={open}
        setIsOpen={setOpen}
      >
        <div className="mt-3 rounded-md border border-foreground/40">
          <table className="w-full">
            <tbody>
              {tableData.map((d, index) => (
                <tr key={d.field}>
                  <td
                    className={clsx(
                      "border-foreground/40 p-2",
                      index !== tableData.length - 1 && "border-b",
                    )}
                  >
                    {d.field}
                  </td>
                  <td
                    className={clsx(
                      "border-foreground/40 border-l",
                      index !== tableData.length - 1 && "border-b ",
                    )}
                  >
                    <Icon
                      className={clsx(
                        "mx-auto",
                        d.isCheck ? "text-green-600" : "text-destructive",
                      )}
                      icon={
                        d.isCheck
                          ? "material-symbols:check"
                          : "material-symbols:close"
                      }
                      fontSize={18}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="inline-flex w-full justify-end gap-3 pt-4">
          <Button
            variant="secondary"
            className="w-28"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            className="w-28"
            onClick={restoreBackupHandler}
          >
            Restore
          </Button>
        </div>
      </Modal>
    </>
  )
}
