let scrollPosition = null;

export function scrollTo(x, y) {
  scrollPosition = { x, y };
}

export function getScrollPosition() {
  return scrollPosition;
}

export function resetScrollPosition() {
  scrollPosition = null;
}
