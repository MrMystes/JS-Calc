function convertToInt (arg) {
  let { arg1, arg2 } = arg
  let r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return {
    argA: arg1,
    argB: arg2,
    m
  }
}

export function accAdd (arg1, arg2) {
  const { argA, argB, m } = convertToInt({ arg1, arg2 })
  return (argA + argB) / m
}

export function accSub (arg1, arg2) {
  const { argA, argB, m } = convertToInt({ arg1, arg2 })
  return (argA - argB) / m
}
export function accMul (arg1, arg2) {
  const { argA, argB, m } = convertToInt({ arg1, arg2 })
  return (argA * argB) / Math.pow(m, 2)
}
export function accDiv (arg1, arg2) {
  const { argA, argB } = convertToInt({ arg1, arg2 })
  return argA / argB
}
