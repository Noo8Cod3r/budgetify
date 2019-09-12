// BUDGET Controller
let budgetController = (() => {

  let Expense = (id, description, value) => {
    this.id = id
    this.description = description
    this.value = value
  }

  let Income = (id, description, value) => {
    this.id = id
    this.description = description
    this.value = value
  }

  let allExpenses = []

  let allIncomes = []

  let totalExpenses = 0

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }



}) ()


// UI CONTROLLER
let UIController = (() => {
  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      }
      
    },
    getDOMStrings: () => {
      return DOMStrings
    }
  }
}) ()


//GLOBAL APP CONTROLLER
let controller = ((budgetCtrl, UICtrl) => {

  let setupEventListeners = () => {
    let DOM = UICtrl.getDOMStrings()

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem )

    document.addEventListener('keypress', e => {
      if ( e.keyCode === 13 || e.which === 13 ) {
        ctrlAddItem()
      }
    })
  }

  let ctrlAddItem = () => {
    // 1. Get Input Data
    let input = UICtrl.getInput()
    // 2. Add item to Budget controller
    // 3. Add new item to UI
    // 4. Calculate Budget
    // 5. Display Budget
  }

  return {
    init: () => {
      console.log('Application has started')
      setupEventListeners()
    }
  }

}) (budgetController, UIController)

controller.init()