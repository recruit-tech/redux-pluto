let scrollPosition = null;

export function scrollTo(x, y) {
  console.log('save scroll position', x, y);
  scrollPosition = { x, y };
}

export function getScrollPosition() {
  return scrollPosition;
}

export function resetScrollPosition() {
  console.log('reset scroll position');
  scrollPosition = null;
}
