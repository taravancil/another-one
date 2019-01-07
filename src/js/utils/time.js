export function getDateString(ts) {
  const elapsedSeconds = (Date.now() - ts) / 1000;

  if (elapsedSeconds < 120) {
    return "just now";
  } else if (elapsedSeconds < 1800) {
    return `${Math.ceil(elapsedSeconds / 60)} minutes ago`;
  } else if (elapsedSeconds < 28800) {
    const hours = Math.ceil(elapsedSeconds / 3600);
    const pluralize = hours > 1 ? "s" : "";
    return `${Math.ceil(elapsedSeconds / 3600)} hour${pluralize} ago`;
  } else {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US");
  }
}
