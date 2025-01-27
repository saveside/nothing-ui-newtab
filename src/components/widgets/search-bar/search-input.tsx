import { Icon } from "@iconify/react"
import { type FormEvent, useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { useSearchEngineStore } from "~/store/search-engine"
import Input from "../../ui/input"

const SearchInput = () => {
  const { searchEngines, selectedEngine, setSelectedEngine } =
    useSearchEngineStore()

  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounceValue<string>(query, 500)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const baseUrl = searchEngines.find(
      ({ name }) => name === selectedEngine,
    )?.baseUrl

    if (baseUrl) {
      try {
        const url = new URL(baseUrl + query)
        window.location.href = url.toString()
      } catch (error) {
        console.error("Not a valid url", error)
      }
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
    <form
      onSubmit={submitHandler}
      className="inline-flex w-full gap-4 overflow-hidden rounded-xl bg-card p-2"
    >
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
        autoFocus
        placeholder="Type here..."
        className="h-11 w-full bg-card px-0 text-base text-card-foreground"
      />
      <button
        type="submit"
        className="rounded-lg bg-destructive px-4 font-medium text-destructive-foreground text-sm active:scale-95"
      >
        Search
      </button>
    </form>
  )
}

export default SearchInput
