const installBtn = document.getElementById("install-button")
const mobileInstallBtn = document.getElementById("mobile-install-button")

if (installBtn !== null && mobileInstallBtn !== null) {
  installBtn.addEventListener("click", () => {
    document.querySelector("pwa-install").openPrompt()
  })

  mobileInstallBtn.addEventListener("click", () => {
    document.querySelector("pwa-install").openPrompt()
  })

  const setShowInstallBtn = (showBtn) => {
    if (showBtn) {
      installBtn.style.display = "block"
      mobileInstallBtn.style.display = "block"
    } else {
      installBtn.style.display = "none"
      mobileInstallBtn.style.display = "none"
    }
  }

  const isIOS =
    navigator.userAgent.includes("iPhone") ||
    navigator.userAgent.includes("iPad") ||
    (navigator.userAgent.includes("Macintosh") &&
      typeof navigator.maxTouchPoints === "number" &&
      navigator.maxTouchPoints > 2)

  const isSupportingBrowser = window.hasOwnProperty("BeforeInstallPromptEvent")

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches

  if (isStandalone) {
    setShowInstallBtn(false)
  } else {
    setShowInstallBtn(
      (isIOS && isSupportingBrowser) ||
        (isSupportingBrowser &&
          (localStorage.getItem("calculatorInstalled") === "" ||
            localStorage.getItem("calculatorInstalled") === "false"))
    )

    console.log(isIOS, isSupportingBrowser)

    // This will only be called if the browser is eligible and PWA has NOT been installed yet
    window.addEventListener("beforeinstallprompt", () => {
      localStorage.setItem("calculatorInstalled", "false")
      setShowInstallBtn(true)
    })

    window.addEventListener("appinstalled", () => {
      localStorage.setItem("calculatorInstalled", "true")
    })
  }
}
