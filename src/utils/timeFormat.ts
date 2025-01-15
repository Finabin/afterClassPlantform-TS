const monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const timeFormat = (date: Date) => {
  const strArr = String(date).split(" ");
  const month = strArr[1];
  const day = strArr[2];
  const year = strArr[3];
  return `${year}-${monthArr[monthArr.indexOf(month) + 1]}-${day}`;
};
