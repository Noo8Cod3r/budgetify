// BUDGET COntroller
let budgetController = (() => {
  // Some Code
}) ()


// UI CONTROLLER
let UIController = (() => {

}) ()


//GLOBAL APP CONTROLLER
let controller = ((budgetCtrl, UICtrl) => {

  let ctrlAddItem = () => {
    // 1. Get Input Data
    // 2. Add item to Budget controller
    // 3. Add new item to UI
    // 4. Calculate Budget
    // 5. Display Budget
    console.log('On Click or Enter Add ...')
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem )

  document.addEventListener('keypress', e => {
    if ( e.keyCode === 13 || e.which === 13 ) {
      ctrlAddItem()
    }
  })

}) (budgetController, UIController)