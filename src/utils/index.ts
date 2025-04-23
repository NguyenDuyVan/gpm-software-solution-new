export const calculateDiscount = (price?: number, comparePrice?: number): string => {
  if (
    comparePrice === undefined ||
    price === undefined ||
    comparePrice <= 0 ||
    price <= 0 ||
    price >= comparePrice
  ) {
    return '0%';
  }

  const discount = ((comparePrice - price) / comparePrice) * 100;
  return `-${discount.toFixed(0)}%`;
};

export const formatCurrency = (price: number): string => {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();
  return `${day}/${month}/${year}`;
};
