import { map, pick } from "lodash/fp";
import AgreedService from "./AgreedService";
import { read } from "./utils";

export const SEARCH_MAX_COUNT = 50;
const SEARCH_ORDER = 3; // Hot pepper beauty のおすすめ順
const PICK_PROPS = [
  "id",
  "last_update",
  "name",
  "name_kana",
  "name_keisai",
  "logo_image",
  "logo_image_square",
  "urls",
  "description"
];

const pickProps = map(pick(PICK_PROPS));

export default class Search extends AgreedService {
  constructor(config) {
    super(config, "search", "beauty/search/", {
      count: SEARCH_MAX_COUNT,
      order: SEARCH_ORDER
    });
  }

  read(req, resource, params, config) {
    const { page, id, ...query } = params;
    if (page) {
      query.start = page * SEARCH_MAX_COUNT + 1;
    }
    const pathname = id ? `${this.pathname}${id}` : this.pathname;

    return read(this.axios, this.name, pathname, query).then(results => {
      const { search: items, ...rest } = results;
      return {
        ...rest,
        search: pickProps(items)
      };
    });
  }
}
