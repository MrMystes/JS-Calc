import Stack from './stack'
export function parseExpression (expression) {
  let reg = /(\d+\.?\d*)|([+\-*\\/()])/g
  let array = []
  let temp
  while ((temp = reg.exec(expression)) !== null) {
    array.push(temp[0])
  }
  return array
}
const priority = {
  '*': 4,
  '/': 4,
  '+': 3,
  '-': 3,
  '(': 2,
  ')': 1
}

function compare (arg1, arg2) {
  return priority[arg1] > priority[arg2]
}

export function toRPolish (array) {
  let operatorStack = Object.create(Stack)
  let RPolishStack = Object.create(Stack)
  for (let i of array) {
    if ((/\d/).test(i)) {
      RPolishStack.push(i)
    } else {
      if (operatorStack.length === 0) {
        operatorStack.push(i)
        continue
      } else {
        if ((/\)/).test(i)) {
          while (true) {
            if (!(/\(/).test(operatorStack.top())) {
              RPolishStack.push(operatorStack.pop())
            } else {
              operatorStack.pop()
              break
            }
          }
        } else if ((/\(/).test(i)) {
          operatorStack.push(i)
        } else {
          while (operatorStack.length > 0) {
            if (compare(i, operatorStack.top())) {
              operatorStack.push(i)
              break
            } else {
              RPolishStack.push(operatorStack.pop())
              if (operatorStack.length === 0) {
                operatorStack.push(i)
                break
              }
            }
          }
        }
      }
    }
  }
  if (operatorStack.length > 0) {
    while (operatorStack.length > 0) {
      RPolishStack.push(operatorStack.pop())
    }
  }
  return RPolishStack
}
