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
    this.themes = options.themes;
  }

  /**
   * Initializes the theme class. Called by the user of the module.
   */
  initialize() {
    this.initializeDefaultTheme();
    this.initializeClickEvents();
  }

  /**
   * Displays the default theme
   */
  initializeDefaultTheme() {
    this.themes.map((theme) => {
      if(theme.default) {
        this.toggleTheme(theme.element);
      }
    });
  }

  /**
   * Adds click event handlers to all DOM objects of the theme switcher.
   */
  initializeClickEvents() {
    this.themes.map((theme) => {
      theme.element.addEventListener("click", (event) => this.toggleTheme(event.target));
    });
  }

  /**
   * Displays the theme passed into it
   * @param {element} chosenTheme - DOM element chosen as the next theme
   */
  toggleTheme(chosenTheme) {
    this.themes.map((theme, index) => {
      if(theme.element === chosenTheme) {
        document.styleSheets[index].disabled = false;
        theme.element.classList.add("active");
      } else {
        document.styleSheets[index].disabled = true;
        theme.element.classList.remove("active");
      }
    });
  }
}
