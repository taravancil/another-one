function TaskCountLabel(props) {
  const { count } = props;
  const pluralize = count > 1 ? "s" : "";
  return count ? `Showing ${count} task${pluralize}` : "";
}

export default TaskCountLabel;
