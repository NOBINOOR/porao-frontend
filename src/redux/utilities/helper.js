
exports.formatDate = (dateString) => {
    const months = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${day}/${month}/${year} ${formattedHours}:${formattedMinutes}${ampm}`;
};
exports.dateFormat = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 10);
};