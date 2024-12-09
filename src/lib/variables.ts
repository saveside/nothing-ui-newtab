export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export type SearchProviders = {
  // Not necessary, but why not?
  short: string
  name: string
  icon: string
  baseUrl: string
}

export const searchProviders = [
  {
    short: "d",
    name: "Duck",
    icon: "mdi:duck",
    baseUrl: "https://duckduckgo.com/html?q=",
  },
  {
    short: "b",
    name: "Brave",
    icon: "simple-icons:brave",
    baseUrl: "https://search.brave.com/search?q=",
  },
  {
    short: "e",
    name: "Ecosia",
    icon: "simple-icons:ecosia",
    baseUrl: "https://ecosia.org/search?method=index&q=",
  },
  {
    short: "g",
    name: "Google",
    icon: "akar-icons:google-fill",
    baseUrl: "https://google.com/search?q=",
  },
  {
    short: "yt",
    name: "YouTube",
    icon: "simple-icons:youtube",
    baseUrl: "https://youtube.com/results?search_query=",
  },
] satisfies SearchProviders[]

export type DockApp = {
  name: string
  icon: string
  url: string
}

export const dockApps = [
  { name: "YouTube", icon: "simple-icons:youtube", url: "youtube.com" },
  { name: "Reddit", icon: "ic:baseline-reddit", url: "reddit.com" },
  { name: "AniList", icon: "simple-icons:anilist", url: "anilist.co" },
  { name: "Type", icon: "simple-icons:monkeytype", url: "monkeytype.com" },
  { name: "Spotify", icon: "mdi:spotify", url: "open.spotify.com" },
  { name: "WhatsApp", icon: "ic:baseline-whatsapp", url: "web.whatsapp.com" },
] satisfies DockApp[]

export type AITool = DockApp
export const aiTools = [
  { name: "ChatGPT", icon: "ph:open-ai-logo", url: "chatgpt.com" },
  { name: "Gemini", icon: "ri:gemini-fill", url: "gemini.google.com/app" },
  { name: "Copilot", icon: "lineicons:copilot", url: "copilot.microsoft.com" },
  { name: "Perplexity", icon: "ri:perplexity-fill", url: "perplexity.ai" },
  // { name: "", icon: "", url: "" },
  // { name: "", icon: "", url: "" },
] satisfies AITool[]
