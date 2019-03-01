import {
  PAGE_NAME,
  SECTION_LEVEL1,
  SECTION_LEVEL2,
  SECTION_LEVEL3,
} from "./variableNames";

export const siteSections = (...sections: Array<string>) => ({
  [PAGE_NAME]: sections.join(":"),
  [SECTION_LEVEL1]: sections.length > 0 && sections[0],
  [SECTION_LEVEL2]: sections.length > 1 && sections[1],
  [SECTION_LEVEL3]: sections.length > 2 && sections[2],
});

export const onAsyncLoaderLoaded = (props: any, state: any): boolean =>
  state.reduxAsyncLoader.loaded;
