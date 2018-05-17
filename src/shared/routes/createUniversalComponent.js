import hoistNonReactStatics from "hoist-non-react-statics";
import universal from "react-universal-component";
import debugFactory from "debug";

const debug = debugFactory("app:shared:routes:createUniversalComponent");

const cssPromiseCache = {};

export default function createUniversalComponent(component, resolve, chunkName) {
  return Promise.all([
    component(),
    universal(component, { resolve, chunkName, loading: "loading..." }),
    importCss(chunkName)
  ]).then(([sourceComponent, targetComponent]) =>
    hoistNonReactStatics(targetComponent, sourceComponent.default)
  );
}

/*
 * A part of these functions are:
 *   Copyright (c) 2017-present James Gillmore <james@faceyspacey.com>
 *   Released under the MIT license.
 *   https://github.com/faceyspacey/babel-plugin-dual-import/blob/master/LICENSE
 *
 *   https://github.com/faceyspacey/babel-plugin-dual-import/blob/master/importCss.js
 */
function importCss(chunkName) {
  if (__CLIENT__) {
    const cssPromise = cssPromiseCache[chunkName];
    if (cssPromise) {
      return cssPromise;
    }
  }

  const href = getHref(chunkName);
  if (!href) {
    if (__DEVELOPMENT__) {
      // eslint-disable-next-line no-underscore-dangle
      if (__SERVER__ || !window.__CSS_CHUNKS__) {
        debug('[DUAL-IMPORT] no css chunks hash found at "window.__CSS_CHUNKS__"');
        return null;
      }
      debug(`[DUAL-IMPORT] no chunk, ${chunkName}, found in "window.__CSS_CHUNKS__"`);
    }
    return null;
  }

  if (href === "loaded") {
    return null;
  }

  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");

  link.href = href;
  link.media = "screen, projection";
  link.rel = "stylesheet";
  link.type = "text/css";
  link.timeout = 30000;

  cssPromiseCache[chunkName] = new Promise((resolve, reject) => {
    let timeout;

    link.onload = () => {
      link.onload = null; // avoid mem leaks in IE.
      link.onload = null; // avoid mem leaks in IE.
      clearTimeout(timeout);
      resolve();
    };

    link.onerror = () => {
      link.onload = null; // avoid mem leaks in IE.
      link.onload = null; // avoid mem leaks in IE.
      clearTimeout(timeout);
      const message = `could not load css chunk:${chunkName}`;
      reject(new Error(message));
    };

    timeout = setTimeout(link.onerror, link.timeout);
    head.appendChild(link);
  });
  return cssPromiseCache[chunkName];
}

function getHref(chunkName) {
  /* eslint-disable no-underscore-dangle */
  if (__SERVER__ || !window.__CSS_CHUNKS__) {
    return null;
  }
  return window.__CSS_CHUNKS__[chunkName];
  /* eslint-enable no-underscore-dangle */
}
