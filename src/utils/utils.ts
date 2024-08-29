export const calculateTotals = (data: any) => {
  let totalSum = 0;

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      totalSum += item.price * item.quantity;
    }
  }

  return totalSum;
};

export const getQuantity = (data: any) => {
  let quantity = 0;

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      quantity += item.quantity;
    }
  }

  return quantity;
};

export const getOrderId = (data: any) => {
  let id = 0;

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      id = item.id;
    }
  }

  return id;
};
