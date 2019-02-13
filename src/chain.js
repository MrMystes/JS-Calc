import { accAdd, accSub, accMul, accDiv } from './calc'
export default class chain {
  constructor (val) {
    this.val = val || 0
  }
  add (val) {
    this.val = accAdd(this.val, val)
    return this
  }
  sub (val) {
    this.val = accSub(this.val, val)
    return this
  }
  mul (val) {
    this.val = accMul(this.val, val)
    return this
  }
  div (val) {
    this.val = accDiv(this.val, val)
    return this
  }
  done () {
    return this.val
  }
}
