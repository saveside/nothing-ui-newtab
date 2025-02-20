import { useEffect, useState } from "react"
import { toast } from "sonner"
import Input from "~/components/ui/input"
import type { SearchEngine } from "~/store/search-engine"
import type { Setter } from "~/types/react"
import { AppCardContainer, AppCardFooter } from "../../shared/app-card"

interface SearchEngineCardProps {
  index: number
  engine: SearchEngine
  setEngine?: Setter<SearchEngine | null>
  engineNames?: string[]
  engineShortcuts?: string[]
  update?: (id: number, engine: SearchEngine) => void
  remove?: (name: string) => void
}

const SearchEngineCard = (props: SearchEngineCardProps) => {
  const [engine, setEngine] = useState<SearchEngine>(props.engine)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    props.setEngine?.(engine)
  }, [engine, props.setEngine])

  const onSaveHandler = () => {
    if (Object.values(engine).some((value) => value === "")) {
      return
    }

    if (props.engineNames?.includes(engine.name)) {
      toast.error(`Engine with name "${engine.name}" already found!`)
      return
    }

    if (props.engineShortcuts?.includes(engine.short)) {
      toast.error(`Engine with shortcut "${engine.short}" already found`)
      return
    }

    if (props.update) {
      props.update(props.index, engine)
      setIsFocused(false)
    }
  }

  return (
    <AppCardContainer
      icon={engine.icon}
      delFunc={() => props.remove?.(engine.name)}
    >
      <Input
        variant="secondary"
        id={`searchengine-icon-${engine.name}`}
        placeholder="icon url"
        value={engine.icon}
        onInput={({ currentTarget: { value } }) =>
          setEngine((prev) => ({ ...prev, icon: value }))
        }
        onFocus={() => setIsFocused(true)}
        className="text-foreground"
      />
      <div className="inline-flex gap-2">
        <Input
          variant="secondary"
          id={`searchengine-name-${engine.name}`}
          placeholder="name"
          value={engine.name}
          onInput={({ currentTarget: { value } }) =>
            setEngine((prev) => ({ ...prev, name: value }))
          }
          onFocus={() => setIsFocused(true)}
          isError={props.engineNames?.includes(engine.name)}
          className="text-foreground"
        />
        <Input
          variant="secondary"
          id={`searchengine-shortcut-${engine.name}`}
          placeholder="shortcut"
          value={engine.short}
          onInput={({ currentTarget: { value } }) =>
            setEngine((prev) => ({ ...prev, short: value.trim() }))
          }
          onFocus={() => setIsFocused(true)}
          isError={props.engineShortcuts?.includes(engine.short)}
          className="text-foreground"
        />
      </div>
      <Input
        variant="secondary"
        id={`searchengine-base-url-${engine.name}`}
        placeholder="base url"
        value={engine.baseUrl}
        onInput={({ currentTarget: { value } }) =>
          setEngine((prev) => ({ ...prev, baseUrl: value }))
        }
        onFocus={() => setIsFocused(true)}
        className="text-foreground"
      />
      <AppCardFooter
        open={isFocused}
        setOpen={setIsFocused}
        saveFunc={onSaveHandler}
      />
    </AppCardContainer>
  )
}

export default SearchEngineCard
