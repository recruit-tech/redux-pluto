let shouldUpdateCb = null;

export function shouldUpdateScroll(oldLocation, currentLocation, cb) {
  shouldUpdateCb = cb;
}

export function updateScroll() {
  if (shouldUpdateCb) {
    shouldUpdateCb(true);
  }
}
