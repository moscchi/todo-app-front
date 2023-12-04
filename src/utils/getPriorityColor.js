export const getPriorityColor = (priority) => {
  switch (priority) {
    case "low":
      return "#5cb85c";
    case "medium":
      return "#f0ad4e";
    case "high":
      return "#d9534f";
    default:
      return "#5cb85c";
  }
};
