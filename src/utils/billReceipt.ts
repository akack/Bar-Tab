import { jsPDF } from 'jspdf'
import { currency } from './currency'
import { useOrderStore } from '@/stores/orderStore'

export function exportToCSV(order: any) {
  const orderState = useOrderStore()
  const header = ['Beverage', 'Quantity', 'Price per Unit', 'Total', 'People', 'Amount per Person']
  const rows = Object.values(order).map((item: any) => [
    item.name,
    item.quantity,
    `${currency(item.price)}`,
    `${currency(item.quantity * item.price)}`,
    `${orderState.bill.noOfPeople}`,
    `${orderState.bill.amountPerPerson}`
  ])

  const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'order.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPDF(order: any) {
  const doc = new jsPDF()

  doc.setFontSize(12)
  doc.text('Order Summary', 10, 10)
  const orderState = useOrderStore()

  const headers = ['Beverage', 'Quantity', 'Price per Unit', 'Total']
  const rows = Object.values(order).map((item: any) => [
    item.name,
    item.quantity.toString(),
    `${currency(item.price)}`,
    `${currency(item.quantity * item.price)}`
  ])

  let y = 20
  headers.forEach((header, i) => {
    doc.text(header, 10 + i * 40, y)
  })

  y += 10
  rows.forEach((row) => {
    row.forEach((cell, i) => {
      doc.text(cell, 10 + i * 40, y)
    })
    y += 10
  })

  const total = Object.values(order).reduce(
    (sum: number, item: any) => sum + item.quantity * item.price,
    0
  )
  doc.text(`Total: ${currency(total)}`, 10, y)
  doc.text(`No Of People: ${orderState.bill.noOfPeople}`, 10, y + 10)
  doc.text(`Amount per Person: ${orderState.bill.amountPerPerson}`, 10, y + 20)

  doc.save('order.pdf')
}
