export const calculateTax = (salary) => {
  let tax = 0;
  if (salary > 4100000) {
    tax = 700000 + (salary - 4100000) * 0.35;
  } else if (salary > 3200000) {
    tax = 430000 + (salary - 3200000) * 0.3;
  } else if (salary > 2200000) {
    tax = 180000 + (salary - 2200000) * 0.25;
  } else if (salary > 1200000) {
    tax = 30000 + (salary - 1200000) * 0.15;
  } else if (salary > 600000) {
    tax = (salary - 600000) * 0.05;
  }
  return tax;
};

export const calculateNetPay = (salary, taxAmount) => {
  return salary - taxAmount;
};
