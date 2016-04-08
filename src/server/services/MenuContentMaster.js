import BaseMaster from './BaseMaster';

export default class MenuContentMaster extends BaseMaster {
  constructor(axios) {
    super(axios, 'menuContentMaster', 'beauty/menuContents/', {}, 'menu_content');
  }
}
