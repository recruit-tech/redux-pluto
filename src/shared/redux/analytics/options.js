import {
  SERVER,
  URL,
  SITE_ID,
  EVENTS,
  PAGE_NAME,
  SECTION_LEVEL1,
  SECTION_LEVEL2,
  SECTION_LEVEL3,
  IS_LOGIN_USER,
  USERNAME
} from "./variableNames";

const mapStateToVariables = state => {
  /* eslint-disable no-unused-vars */
  const { app: { auth } } = state;
  return {
    [SERVER]: window.location.hostname,
    [URL]: "D=g", // uses s.PageURL on server
    [SITE_ID]: "redux-proto",
    [USERNAME]: auth.username ? `${auth.username}` : "",
    [IS_LOGIN_USER]: `${auth.login}`
  };
};

const suppressPageView = (state, action) => {
  const lastPageView = state.analytics.page.lastPageViewSent;
  // 既にPageViewを送っていて、locationの変更のない場合はPageViewを送らない
  return lastPageView && lastPageView.location === action.payload.location;
};

const getLocationInStore = state => state.routing.locationBeforeTransitions;

const composeEventName = (variables, state) => {
  const pageName = variables[PAGE_NAME] || "*";
  const eventCd = Array.isArray(variables[EVENTS])
    ? variables[EVENTS].sort().join("+")
    : "*";
  return `${pageName}/${eventCd}`;
};

export default {
  eventMixins: [PAGE_NAME, SECTION_LEVEL1, SECTION_LEVEL2, SECTION_LEVEL3],
  pageViewMixins: [
    SERVER,
    URL,
    SITE_ID,
    PAGE_NAME,
    SECTION_LEVEL1,
    SECTION_LEVEL2,
    SECTION_LEVEL3,
    IS_LOGIN_USER,
    USERNAME
  ],
  mapStateToVariables,
  getLocationInStore,
  composeEventName,
  suppressPageView
};
