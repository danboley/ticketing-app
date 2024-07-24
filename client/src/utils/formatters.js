// Date Formatter
export const dateFormatter = (params) => {
  if (params.value) {
    return new Date(params.value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    return "";
  }
};

// Status Formatter
export const statusFormatter = (params) => {
  if (params.value === "new") {
    return "New";
  } else if (params.value === "in_progress") {
    return "In Progress";
  } else if (params.value === "resolved") {
    return "Resolved";
  } else {
    return params.value;
  }
};

// Text Truncater
export const textTruncater = (params) => {
  return <div className="truncate w-full">{params.value}</div>;
};
