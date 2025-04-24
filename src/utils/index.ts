export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return day.toString().padStart(2, '0') + '-' + month.toString().padStart(2, '0') + '-' + year;
};

export const formatDateTimeString = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return (
    day.toString().padStart(2, '0') +
    '-' +
    month.toString().padStart(2, '0') +
    '-' +
    year +
    ' ' +
    h.toString().padStart(2, '0') +
    ':' +
    m.toString().padStart(2, '0') +
    ':' +
    s.toString().padStart(2, '0')
  );
};

export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formatter.format(price);
};

export const getCurrentDateString = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate().toString().padStart(2, '0');

  return `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay}`;
};

export const getFistDateOfCurrentMonthString = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
};

export const getLastDateOfCurrentMonthString = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const lastDay = getLastdayOfCurrentMonth();

  return `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
};

const getLastdayOfCurrentMonth = (): number => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const nextMonth = currentMonth + 1;
  const nextMonthFirstDay = new Date(currentDate.getFullYear(), nextMonth, 1);
  const lastDayOfMonth = new Date(nextMonthFirstDay.getTime() - 1);
  const lastDay = lastDayOfMonth.getDate();

  return lastDay;
};
export const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
