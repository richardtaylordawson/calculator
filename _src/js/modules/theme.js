/**
 * @author Richard Dawson
 * @classdesc involves all logic, event listeners, etc of a switching themes
 */
export default class Theme {
  /**
   * Create a Theme Switcher.
   * @param {object} options - All the DOM objects and themes of the application
   */
  constructor(options) {
    this.themes = options.themes
  }

  /**
   * Initializes the theme class. Called by the user of the module.
   */
  initialize() {
    this.initializeDefaultTheme()
    this.initializeEvents()
  }

  /**
   * Displays the default theme
   */
  initializeDefaultTheme() {
    this.themes.map((theme) => {
      if (theme.default) {
        this.toggleTheme(theme.element)
      }
    })
  }

  /**
   * Adds click event handlers to all DOM objects of the theme switcher.
   */
  initializeEvents() {
    this.themes.map((theme) => {
      if (theme.elementType === "button") {
        theme.element.addEventListener("click", (event) =>
          this.toggleTheme(event.target)
        )
      } else if (theme.elementType === "select") {
        theme.element.addEventListener("change", (event) =>
          this.toggleTheme(event.target.value)
        )
      }
    })
  }

  /**
   * Displays the theme passed into it
   * @param {element} chosenTheme - DOM element chosen as the next theme
   */
  toggleTheme(chosenTheme) {
    let chosenIndex = 0

    this.themes.map((theme, index) => {
      if (theme.elementType === "button") {
        if (theme.element === chosenTheme) {
          chosenIndex = index
          theme.element.classList.add("active")
        } else {
          theme.element.classList.remove("active")
        }
      } else if (theme.elementType === "select") {
        theme.element.value = chosenTheme
      }
    })

    for (let i = 0; i < this.themes.length; i++) {
      document.styleSheets[i].disabled = i !== chosenIndex
    }
  }
}
