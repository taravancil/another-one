export function findParent(node, className) {
  while (node.classList && !node.classList.contains(className)) {
    node = node.parentNode;
  }

  return node.classList ? node : null;
}
