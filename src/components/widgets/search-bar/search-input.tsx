import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { useSearchEngineStore } from "~/store/search-engine"
import Input from "../../ui/input"

const SearchInput = () => {
  const { searchEngines, selectedEngine, setSelectedEngine } =
    useSearchEngineStore()

  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounceValue<string>(query, 500)

  const submitHandler = () => {
    const baseUrl = searchEngines.find(
      ({ name }) => name === selectedEngine,
    )?.baseUrl
    if (baseUrl) {
      window.open(baseUrl + query, "_blank")
    }
  }

  useEffect(() => {
    if (
      debouncedQuery.startsWith("!") &&
      debouncedQuery.substring(0, 2).length > 1
    ) {
      const querySlices = query.split(" ")
      const short = querySlices[0].slice(1)
      if (short && short.length > 0) {
        const newEngine = searchEngines.find(
          (provider) => provider.short === short,
        )
        if (newEngine) {
          setSelectedEngine(newEngine.name)
          setQuery(querySlices.slice(1).join(" "))
        }
      }
    }
  }, [searchEngines, debouncedQuery, setSelectedEngine, query])

  return (
    <div className="inline-flex w-full gap-4 overflow-hidden rounded-xl bg-card p-2">
      <span>
        <div className="flex size-11 items-center rounded-lg bg-foreground text-background">
          <Icon icon="tabler:search" className="mx-auto" />
        </div>
      </span>
      <Input
        id="search-engine-query"
        outline="ghost"
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
        placeholder="Type here..."
        className="h-11 w-full bg-card px-0 text-card-foreground"
      />
      <button
        type="button"
        onClick={submitHandler}
        className="rounded-lg bg-destructive px-4 font-medium text-destructive-foreground text-sm active:scale-95"
      >
        Search
      </button>
    </div>
  )
}

export default SearchInput
