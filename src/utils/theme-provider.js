;(() => {
  const lsData = localStorage.getItem("data-theme")

  if (lsData) {
    const isLightModeEnabled = JSON.parse(lsData).state.isLightMode
    document.documentElement.setAttribute(
      "data-theme",
      isLightModeEnabled ? "light" : "dark",
    )
  }
})()
