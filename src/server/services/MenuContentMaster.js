import AgreedMaster from "./AgreedMaster";

export default class MenuContentMaster extends AgreedMaster {
  constructor(config) {
    super(
      config,
      "menuContentMaster",
      "beauty/menuContents/",
      {},
      "menu_content"
    );
  }
}
