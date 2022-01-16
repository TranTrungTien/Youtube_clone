const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDateClearly(dateIso: string = "") {
  const date = new Date(dateIso);
  if (!date) {
    return "";
  } else {
    return (
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      "," +
      date.getFullYear()
    );
  }
}

// const currentDate = new Date();
// const years = date.getFullYear();
// const currentYears = currentDate.getFullYear();
// const month = date.getMonth() + 1;
// const day = currentDate.getDate();
// const currentDay = currentDate.getDate();
// const currentMonth = currentDate.getFullYear();
// if (currentYears - years > 0) {
//   if (currentYears - years === 1) {
//     return currentYears - years + " year ago";
//   }
//   return currentYears - years + " years ago";
// } else if (currentDate.getMonth()) {
// }
