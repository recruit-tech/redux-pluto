import BaseMaster from "./BaseMaster";

export default class HairColorMaster extends BaseMaster {
  constructor(config) {
    super(config, "hairColorMaster", "beauty/hairColor/", {}, "hair_color");
  }
}
