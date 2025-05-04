export const formatMessageDateWithDay = (timestamp, isDateTime) => {
  const messageDate = new Date(timestamp + "Z");
  const today = new Date();

  // Normalize to midnight for comparison
  const messageDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate(),
  );
  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diffTime = todayDay - messageDay;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // Get weekday name
  const weekday = messageDate.toLocaleDateString("en-US", { weekday: "long" });

  if (diffDays === 0) {
    return isDateTime
      ? messageDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : `Today`;
  } else if (diffDays === 1) {
    return `Yesterday`;
  } else if (diffDays < 5) {
    return weekday;
  } else {
    return isDateTime
      ? `${messageDate.toLocaleDateString("en-US")}`
      : `${messageDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}`;
    // return `${messageDate.toLocaleDateString("en-US")}`;
  }
};
