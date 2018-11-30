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

        this.initializeDefaultTheme();

        this.initializeClickEvents();
    }

    /**
     * Displays the default theme
     */
    initializeDefaultTheme() {
        this.themes.forEach((theme) => {
            if(theme.default) {
                this.toggleTheme(theme.element);
            }
        });
    }

    /**
     * Adds click event handlers to all DOM objects of the theme switcher.
     */
    initializeClickEvents() {
        this.themes.forEach((theme) => {
            theme.element.addEventListener('click', (event) => {
                this.toggleTheme(event.target);
            });
        });
    }

    /**
     * Displays the theme passed into it
     * @param {element} chosenTheme - DOM element chosen as the next theme
     */
    toggleTheme(chosenTheme) {
        let chosenIndex = 0;

        this.themes.forEach((theme, index) => {
            if(theme.element === chosenTheme) {
                chosenIndex = index;
                theme.element.classList.add('active');
            } else {
                theme.element.classList.remove('active');
            }
        });

        for(let i = 0; i < this.themes.length; i++) {
            document.styleSheets[i].disabled = (i !== chosenIndex)
        }
    }
}
