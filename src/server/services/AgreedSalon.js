import { map, pick } from "lodash/fp";
import AgreedService from "./AgreedService";
import { read } from "./utils";

export const SALON_SEARCH_MAX_COUNT = 50;
const PICK_PROPS = [
  "id",
  "last_update",
  "name",
  "logo_image",
  "logo_image_square",
  "urls",
  "description"
];

const pickProps = map(pick(PICK_PROPS));

export default class AgreedSalon extends AgreedService {
  constructor(config) {
    super(config, "agreedSalon", "beauty/salon/", {});
  }

  read(req, resource, params, config) {
    const { page, id, ...query } = params;
    if (page) {
      query.start = page * SALON_SEARCH_MAX_COUNT + 1;
    }
    const pathname = id ? `${this.pathname}${id}` : this.pathname;

    return read(this.axios, this.name, pathname, query).then(results => {
      const { salon: items, ...rest } = results;
      return {
        ...rest,
        salon: pickProps(items)
      };
    });
  }
}
