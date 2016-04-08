import transform from 'lodash/fp/transform';
import BaseMaster from './BaseMaster';

const formatReslt = transform((results, item) => {
  results[item.code] = item;
})({});

export default class HairLengthMaster extends BaseMaster {
  constructor(axios) {
    super(axios, 'genderMaster', 'beauty/styleCategory/', {}, 'style_category', formatReslt);
  }
}
