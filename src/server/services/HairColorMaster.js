/* @flow */
import AgreedMaster from "./AgreedMaster";

export default class HairColorMaster extends AgreedMaster {
  constructor(config: any) {
    super(config, "hairColorMaster", "beauty/hairColor/", {}, "hair_color");
  }
}
