import Stack from '.src/stack'
import { parseExpression, toRPolish } from '.src/parse'
import Chain from '.src/chain'
import { accAdd, accSub, accMul, accDiv } from '.src/calc'

function calculate (RPolish) {
  let resultStack = Object.create(Stack)
  let result
  for (let i of RPolish) {
    if (/\d/.test(i)) {
      resultStack.push(Number(i))
    } else {
      if (resultStack.length < 2) throw new Error('Expression Illegal: Incomplete Expression')
      let right = resultStack.pop()
      let left = resultStack.pop()
      switch (i) {
        case '+':
          result = accAdd(left, right)
          resultStack.push(result)
          break
        case '-':
          result = accSub(left, right)
          resultStack.push(result)
          break
        case '*':
          result = accMul(left, right)
          resultStack.push(result)
          break
        case '/':
          result = accDiv(left, right)
          resultStack.push(result)
          break
        default:
          break
      }
    }
  }
  if (resultStack.length > 1) throw new Error('Expression Illegal: Extra operator')
  if (typeof result !== 'undefined') {
    return result
  } else {
    throw new Error('Expression Illegal: Incomplete Expression')
  }
}

export default {
  eval (expression) {
    const array = parseExpression(expression)
    const RPolish = toRPolish(array)
    const validation = RPolish.every(item => {
      return !/[()]/.test(item)
    })
    if (validation) {
      return calculate(RPolish)
    } else {
      throw new Error('Expression Illegal: Extra brackets')
    }
  },
  add: accAdd,
  sub: accSub,
  mul: accMul,
  div: accDiv,
  chain (val) {
    return new Chain(val)
  }
}
