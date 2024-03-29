// BUDGET Controller
let budgetController = (() => {

  let Expense = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  };

  let Income = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  };

  let calculateTotal = (type) => {
    let sum = 0
    data.allItems[type].forEach(cur => {
      sum += cur.value
    })
    data.totals[type] = sum
  }
  
  // Data Model
  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1,
  }

  return {
    addItem: (type, des, val) => {
      let newItem, ID;

      // Creates new ID 
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1
      } else {
        ID = 0
      }
      
      // Create newItem based on 'exp' or 'inc' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val)
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val)
      }
      
      // Push newItem into data structure
      data.allItems[type].push(newItem)

      // retun the newItem element
      return newItem
      
    },
    calculateBudget: () => {
      // Calculate total income and expenses
      calculateTotal('inc')
      calculateTotal('exp')


      // Calculate Budget: income - expences
      data.budget = data.totals.inc - data.totals.exp

      // Calculate the percentage of income spent
      if (data.totals.inc > 0 ){
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
      } else {
        data.percentage = -1
      }
      

    },

    getBudget: () => {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: () => {
      console.log(data)
    }
  }

})();


// UI CONTROLLER
let UIController = (() => {
  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage',
    container: '.container',
  }

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      }
      
    },
    addListItem: (obj, type) => {
      let html, newHtml, element
      // Create HTML String w/Placholder
      if (type === 'inc') {
        element = DOMStrings.incomeContainer
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMStrings.expensesContainer
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace Placholder with Data
      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', obj.value)

      // Incert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    clearFields: () => {
      let fields, fieldsArr

      fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue)

      fieldsArr = Array.prototype.slice.call(fields)

      fieldsArr.forEach((current, index, array) => {
        current.value = "";
      });
      fieldsArr[0].focus()
    },

    displayBudget: (obj) => {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
      document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp
      

      if (obj.percentage > 0 ){
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
      }else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---'
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
  }

  let updateBudget = () => {
    // Calculate Budget
    budgetCtrl.calculateBudget()
    //Return Budget
    let budget = budgetCtrl.getBudget()
    // Display Budget
    UICtrl.displayBudget(budget)
  }

  let ctrlAddItem = () => {
    let input, newItem
    // 1. Get Input Data
    input = UICtrl.getInput()

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to Budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value)
      // 3. Add new item to UI
      UICtrl.addListItem(newItem, input.type)
      // 4. Clear input fields
      UICtrl.clearFields()
      // Calculate and update Budget
      updateBudget()
    } 
  }

  let ctrlDeleteItem = (e) => {
    console.log(e.target.parentNode.parentNode.parentNode.id)
  }

  return {
    init: () => {
      console.log('Application has started')
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      })
      setupEventListeners()
    }
  }

}) (budgetController, UIController)

controller.init()