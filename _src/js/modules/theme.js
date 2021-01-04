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
    this.themeButtons = options.themeButtons
    this.themeSelect = options.themeSelect
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
    this.themeButtons.forEach((theme) => {
      if (theme.default) {
        this.toggleTheme(theme.element)
      }
    })
  }

  /**
   * Adds click event handlers to all DOM objects of the theme switcher.
   */
  initializeEvents() {
    this.themeButtons.forEach((theme) => {
      theme.element.addEventListener("click", (event) =>
        this.toggleTheme(event.target)
      )
    })

    this.themeSelect.addEventListener("change", (event) => {
      this.themeButtons.forEach((theme) => {
        if (theme.identifier === event.target.value) {
          this.toggleTheme(theme.element)
        }
      })
    })
  }

  /**
   * Displays the theme passed into it
   * @param {element} chosenTheme - DOM element chosen as the next theme
   */
  toggleTheme(chosenTheme) {
    let chosenIndex = 0

    this.themeButtons.forEach((theme, index) => {
      if (theme.element === chosenTheme) {
        chosenIndex = index
        theme.element.classList.add("active")
      } else {
        theme.element.classList.remove("active")
      }
    })

    for (let i = 0; i < this.themeButtons.length; i++) {
      document.styleSheets[i].disabled = i !== chosenIndex
    }
  }
}
