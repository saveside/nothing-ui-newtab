import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import Input from "~/components/ui/input"
import type { App } from "~/lib/variables"
import { useAppStore } from "~/store/app-store"
import type { Setter } from "~/types/react"
import AppCard from "../../shared/app-card"

interface AIToolCardProps {
  index: number
  aiTool: App
  setAITool?: Setter<App | null>
}

const AIToolCard = (props: AIToolCardProps) => {
  const { aiTools, updateAITool: update, removeAITool: remove } = useAppStore()
  const [aiTool, setAITool] = useState<App>(props.aiTool)
  const [debouncedValue] = useDebounceValue(aiTool, 500)

  useEffect(() => {
    props.setAITool?.(aiTool)
  }, [aiTool, props.setAITool])

  useEffect(() => {
    if (Object.values(debouncedValue).some((value) => value === "")) {
      return
    }

    if (
      props.index < aiTools.length - 1 &&
      JSON.stringify(debouncedValue) !== JSON.stringify(props.aiTool)
    ) {
      update(props.index, debouncedValue)
    }
  }, [debouncedValue, aiTools, props, update])

  return (
    <AppCard icon={aiTool.icon} delFunc={() => remove(aiTool.name)}>
      <Input
        variant="secondary"
        id="aitool-name"
        placeholder="icon"
        value={aiTool.icon}
        onInput={({ currentTarget: { value } }) =>
          setAITool((prev) => ({ ...prev, name: value }))
        }
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id="aitool-name"
        placeholder="name"
        value={aiTool.name}
        onInput={({ currentTarget: { value } }) =>
          setAITool((prev) => ({ ...prev, name: value }))
        }
        className="text-foreground"
      />
      <Input
        variant="secondary"
        id="aitool-url"
        placeholder="url"
        value={aiTool.url}
        onInput={({ currentTarget: { value } }) =>
          setAITool((prev) => ({ ...prev, url: value }))
        }
        className="text-foreground"
      />
    </AppCard>
  )
}

export default AIToolCard
