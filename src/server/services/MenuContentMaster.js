import BaseMaster from './BaseMaster';

export default class MenuContentMaster extends BaseMaster {
  constructor(config) {
    super(config, 'menuContentMaster', 'beauty/menuContents/', {}, 'menu_content');
  }
}
