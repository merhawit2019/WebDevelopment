class Calculator {
  constructor(prevOperandTxt, currOperandTxt) {
    this.previousOperand_txt = prevOperandTxt
    this.currentOperand_txt = currOperandTxt
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
 
    const decimalDigits = stringNumber
    
    if (decimalDigits != null) {
      return `${decimalDigits}`
    } 
  }

  updateDisplay() {
    this.currentOperand_txt.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperand_txt.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperand_txt.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[number]')
const operationButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelector('[equal]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[clear]')
const previousOperandTxt = document.querySelector('[prev-operand]')
const currentOperandTxt = document.querySelector('[curr-operand]')

const calculator = new Calculator(previousOperandTxt, currentOperandTxt)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})