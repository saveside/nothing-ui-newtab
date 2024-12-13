import { Icon } from "@iconify/react/dist/iconify.js"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import SidebarOptions from "./sidebar-options"

const Backdrop = ({ onOpenChange }: { onOpenChange: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "linear", duration: 0.3 }}
      onClick={onOpenChange}
      className="fixed top-0 left-0 z-10 min-h-screen w-full backdrop-blur-md"
    />
  )
}

const SidebarContent = () => {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="fixed top-0 right-0 z-20 h-full w-96 select-none p-1 font-rubik"
    >
      <div className="flex h-full w-full flex-col rounded-xl bg-card p-4 text-card-foreground">
        <span className="pt-3 pb-8 pl-4 font-lora font-thin text-2xl">
          Settings
        </span>
        <div className="inline-flex size-full justify-between overflow-y-auto overflow-x-hidden px-4">
          <SidebarOptions />
        </div>
      </div>
    </motion.div>
  )
}

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <AnimatePresence mode="wait">
        {!open && (
          <motion.button
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20, opacity: 0 }}
            type="button"
            onClick={() => setOpen(true)}
            className="fixed right-4 bottom-4 z-10 size-12 rounded-full bg-card text-white active:scale-95"
          >
            <Icon
              icon="tabler:circle-dotted-letter-n"
              fontSize={36}
              className="mx-auto text-card-foreground"
            />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {open && (
          <>
            <SidebarContent />
            <Backdrop onOpenChange={() => setOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
