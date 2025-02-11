import { clear } from "idb-keyval"
import Alert from "~/components/ui/alert"

const alertDesc =
  "This process is irreversible and will reset all settings to default. Make sure to back up your data before proceeding! :)"

export default function DataBackupOptions() {
  const restoreDefaults = async () => {
    // Clear Index DB
    await clear().then(() => {
      // Clear all items from localStorage
      for (const key of Object.keys(localStorage)) {
        localStorage.removeItem(key)
      }
      window.location.reload()
    })
  }

  return (
    <div className="space-y-3">
      <Alert
        btnText="Restore Defaults"
        desc={alertDesc}
        variant="destructive"
        buttonClassName="w-full"
        confirmFunc={restoreDefaults}
      />
    </div>
  )
}
