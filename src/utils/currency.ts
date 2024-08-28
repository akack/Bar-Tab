export const currency = (amount: any, modifier = 100) => {
  if (amount == null) return ''
  const amountReg = amount.toString().match(/[\d.]+/)
  if (amountReg) {
    amount = amountReg[0]
  } else {
    amount = ''
  }

  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount / modifier)
}
