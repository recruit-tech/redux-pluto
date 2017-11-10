export default (state, action) => {
  const lastPageView = state.analytics.page.lastPageViewSent;
  // 既にPageViewを送っていて、locationの変更のない場合はPageViewを送らない
  return lastPageView && lastPageView.location === action.payload.location;
};
