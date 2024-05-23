export const getCurrentDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  const fullBookingDate = `${day}-${month}-${year}`;

  return fullBookingDate;
};
