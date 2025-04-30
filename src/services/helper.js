export const formatMessageDateWithDay = (timestamp) => {
  const messageDate = new Date(timestamp);
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
    return `Today (${weekday})`;
  } else if (diffDays === 1) {
    return `Yesterday (${weekday})`;
  } else {
    return `${messageDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`;
    // return `${messageDate.toLocaleDateString("en-US")}`;
  }
};
