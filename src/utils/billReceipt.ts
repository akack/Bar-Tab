import { jsPDF } from 'jspdf';
import { currency } from './currency';
import { useOrderStore } from '@/stores/orderStore';

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const groupItemsByName = (data: string[][]): string[][] => {
  const itemMap = new Map<string, Item>();

  for (const [name, quantityStr, priceStr, totalStr] of data) {
    const quantity = parseInt(quantityStr, 10);
    const price = parseFloat(priceStr.replace(/[^0-9.-]+/g, ''));
    const total = parseFloat(totalStr.replace(/[^0-9.-]+/g, ''));

    const existingItem = itemMap.get(name);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total += total;
    } else {
      itemMap.set(name, { name, quantity, price, total });
    }
  }

  const groupedItems: string[][] = [];

  for (const { name, quantity, price, total } of itemMap.values()) {
    groupedItems.push([name, quantity.toString(), ` ${currency(price)}`, `${currency(total)}`]);
  }

  return groupedItems;
};

const generateRows = (order: any) => {
  const rows: any = [];
  let total = 0;
  Object.keys(order).forEach((key) => {
    const o = order[key] as any;
    Object.values(o).map((item: any) => {
      const tableRow = [item.name, item.quantity.toString(), `${item.price}`, `${item.quantity * item.price}`];
      total += item.quantity * item.price;
      rows.push(tableRow);
    });
  });

  return { rows, total };
};

export const exportToCSV = (order: any) => {
  const orderState = useOrderStore();
  const header = ['Beverage', 'Quantity', 'Price per Unit', 'Total'];

  const { rows, total } = generateRows(order);
  const finalRows = groupItemsByName(rows);

  finalRows.push(['Total', '', '', `${currency(total)}`]);
  finalRows.push(['No of People', '', '', `${orderState.bill.noOfPeople}`]);
  finalRows.push(['Amount Per Person', '', '', `${currency(total / orderState.bill.noOfPeople)}`]);

  const csvContent = [header, ...finalRows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'order.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (order: any) => {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text('Order Summary', 10, 10);
  const orderState = useOrderStore();

  const headers = ['Beverage', 'Quantity', 'Price per Unit', 'Total'];

  const { rows, total } = generateRows(order);
  const finalRows = groupItemsByName(rows);

  let y = 20;
  headers.forEach((header, i) => {
    doc.text(header, 10 + i * 40, y);
  });

  y += 10;
  finalRows.forEach((row: any) => {
    row.forEach((cell: any, i: any) => {
      doc.text(cell, 10 + i * 40, y);
    });
    y += 10;
  });

  doc.text(`Total: ${currency(total)}`, 10, y);
  doc.text(`No Of People: ${orderState.bill.noOfPeople}`, 10, y + 10);
  doc.text(`Amount per Person: ${currency(total / orderState.bill.noOfPeople)}`, 10, y + 20);

  doc.save('order.pdf');
};
