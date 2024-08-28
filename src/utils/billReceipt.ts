import { jsPDF } from 'jspdf';
import { currency } from './currency';
import { useOrderStore } from '@/stores/orderStore';

const createRowsForExport = (order: any) => {
  const rows: any = [];
  let total = 0;
  Object.keys(order).forEach((key) => {
    const o = order[key] as any;
    Object.values(o).map((item: any) => {
      const tableRow = [
        item.name,
        item.quantity.toString(),
        `${currency(item.price)}`,
        `${currency(item.quantity * item.price)}`,
      ];
      total += item.quantity * item.price;
      rows.push(tableRow);
    });
  });

  return { rows, total };
};

export const exportToCSV = (order: any) => {
  const orderState = useOrderStore();
  const header = ['Beverage', 'Quantity', 'Price per Unit', 'Total'];

  const { rows, total } = createRowsForExport(order);

  rows.push(['Total', '', '', `${currency(total)}`]);
  rows.push(['No of People', '', '', `${orderState.bill.noOfPeople}`]);
  rows.push(['Amount Per Person', '', '', `${currency(total / orderState.bill.noOfPeople)}`]);

  const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');

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

  const { rows, total } = createRowsForExport(order);

  let y = 20;
  headers.forEach((header, i) => {
    doc.text(header, 10 + i * 40, y);
  });

  y += 10;
  rows.forEach((row: any) => {
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
