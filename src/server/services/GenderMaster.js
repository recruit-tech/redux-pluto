import { transform } from 'lodash/fp';
import { create as createAxios } from 'axios';
import BaseMaster from './BaseMaster';

export default class HairLengthMaster extends BaseMaster {
  constructor(config) {
    super(
      config, 'genderMaster', 'beauty/styleCategory/', {}, 'style_category',
      transform((results, item) => {
        results[item.code] = item;
      }, {}),
    );
    // TODO: 他のagreedが出揃ったらBaseServiceに一本化
    this.axios = createAxios(config.agreed.config.axios);
  }
}
