import { transform } from 'lodash/fp';
import BaseMaster from './BaseMaster';

export default class HairLengthMaster extends BaseMaster {
  constructor(config) {
    super(
      config, 'genderMaster', 'beauty/styleCategory/', {}, 'style_category',
      transform((results, item) => {
        results[item.code] = item;
      }, {}),
    );
  }
}
