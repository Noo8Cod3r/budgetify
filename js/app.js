// BUDGET COntroller
let budgetController = (() => {
  // Some Code
}) ()


// UI CONTROLLER
let UIController = (() => {
  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value'
  }
  
  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      }
      
    }
  }
}) ()


//GLOBAL APP CONTROLLER
let controller = ((budgetCtrl, UICtrl) => {

  let ctrlAddItem = () => {
    // 1. Get Input Data
    let input = UICtrl.getInput()
    console.log(input)
    // 2. Add item to Budget controller
    // 3. Add new item to UI
    // 4. Calculate Budget
    // 5. Display Budget
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem )

  document.addEventListener('keypress', e => {
    if ( e.keyCode === 13 || e.which === 13 ) {
      ctrlAddItem()
    }
  })

}) (budgetController, UIController)