const Stack = Object.create([])
Stack.top = function () {
  return this[this.length - 1]
}

export default Stack
