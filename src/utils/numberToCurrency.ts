export function numberToCurrency(value) {
    if (!value) return 0
    // 整数
    const intPart = Math.trunc(value)
    // 增加,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    let floatPart = ''
    const valueArray = value.toString().split('.')
    if (valueArray.length === 2) { 
      floatPart = valueArray[1].toString()
      return intPartFormat + '.' + floatPart
    }
    return intPartFormat + floatPart
  }