import Calculator from "./modules/calculator.js"
import Theme from "./modules/theme.js"
import "./utils/install-button"

/**
 * Initializes the calculator object
 * Object takes care of all the logic, event listeners, etc of the calculator
 * @param {object} all the elements of the calculator
 * @param {object} all the options of the calculator
 * @constant Calculator
 */
const calculator = new Calculator(
  {
    numberButtons: [
      document.getElementById("btn-zero"),
      document.getElementById("btn-one"),
      document.getElementById("btn-two"),
      document.getElementById("btn-three"),
      document.getElementById("btn-four"),
      document.getElementById("btn-five"),
      document.getElementById("btn-six"),
      document.getElementById("btn-seven"),
      document.getElementById("btn-eight"),
      document.getElementById("btn-nine"),
    ],
    decimalButton: document.getElementById("btn-decimal"),
    plusMinusButton: document.getElementById("btn-plus-minus"),
    clearButton: document.getElementById("btn-clear"),
    backspaceButton: document.getElementById("btn-backspace"),
    percentageButton: document.getElementById("btn-percentage"),
    squareRootButton: document.getElementById("btn-square-root"),
    additionButton: document.getElementById("btn-addition"),
    subtractionButton: document.getElementById("btn-subtraction"),
    multiplicationButton: document.getElementById("btn-multiplication"),
    divisionButton: document.getElementById("btn-division"),
    equalsButton: document.getElementById("btn-equals"),
    primaryDisplay: document.getElementById("primary-display"),
    secondaryDisplay: document.getElementById("secondary-display"),
  },
  {
    maxNumberLength: 12,
  }
)

calculator.initialize()

/**
 * Initializes the theme object
 * Object takes care of all the logic, event listeners, etc of switching app theme
 * @param {object} All the DOM elements and identifiers for the application themes
 * @constant Theme
 */
const theme = new Theme({
  themeButtons: [
    {
      element: document.getElementById("minty-theme"),
      identifier: "minty-theme",
      default: false,
    },
    {
      element: document.getElementById("sandstone-theme"),
      identifier: "sandstone-theme",
      default: false,
    },
    {
      element: document.getElementById("pulse-theme"),
      identifier: "pulse-theme",
      default: false,
    },
    {
      element: document.getElementById("solar-theme"),
      identifier: "solar-theme",
      default: false,
    },
    {
      element: document.getElementById("united-theme"),
      identifier: "united-theme",
      default: false,
    },
    {
      element: document.getElementById("dark-theme"),
      identifier: "dark-theme",
      default: false,
    },
    {
      element: document.getElementById("school-theme"),
      identifier: "school-theme",
      default: false,
    },
    {
      element: document.getElementById("default-theme"),
      identifier: "default-theme",
      default: true,
    },
  ],
  themeSelect: document.getElementById("select-theme"),
})

theme.initialize()

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
}
