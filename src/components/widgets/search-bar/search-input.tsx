import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { searchProviders } from "../../../lib/variables"
import { useOptionsStore } from "../../../store/options"

const SearchInput = () => {
  const { selectedEngine, setSelectedEngine } = useOptionsStore()

  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounceValue<string>(query, 500)

  const submitHandler = () => {
    const baseUrl = searchProviders.find(
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
        const newEngine = searchProviders.find(
          (provider) => provider.short === short,
        )
        if (newEngine) {
          setSelectedEngine(newEngine.name)
          setQuery(querySlices.slice(1).join(" "))
        }
      }
    }
  }, [debouncedQuery, setSelectedEngine, query])

  return (
    <div className="inline-flex w-full gap-4 overflow-hidden rounded-xl bg-card p-2">
      <span>
        <div className="flex size-11 items-center rounded-lg bg-foreground text-background">
          <Icon icon="tabler:search" className="mx-auto" />
        </div>
      </span>
      <input
        id="search-engine-query"
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
        placeholder="Type here..."
        className="h-11 w-full bg-card text-card-foreground focus:outline-none"
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
