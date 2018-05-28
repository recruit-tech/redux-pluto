/* @flow */
import { reduce, transform } from "lodash/fp";
import AgreedMaster from "./AgreedMaster";

const AREA_NAMES = ["service_area", "middle_area", ""];

export default class AreaMaster extends AgreedMaster {
  constructor(config: any) {
    super(
      config,
      "areaMaster",
      "beauty/smallArea/",
      {},
      "small_area",
      transform(formatResult, {}),
    );
  }
}

function formatResult(results, smallArea) {
  return reduce(
    (parent, areaName) => {
      const source = areaName ? smallArea[areaName] : smallArea;
      const { code } = source;
      if (!parent[code]) {
        parent[code] = {
          code,
          name: source.name,
          count: source.cnt,
          ...(areaName ? { items: {} } : {}),
        };
      }
      return parent[code].items;
    },
    results,
    AREA_NAMES,
  );
}
