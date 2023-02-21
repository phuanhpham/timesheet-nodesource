export const convert2String = (startStr, eventTime) => {
  const timeString = new Date(
    `${startStr.split("T")[0]}T${eventTime}`
  ).toISOString();
  return timeString;
};
