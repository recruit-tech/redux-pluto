import BaseMaster from './BaseMaster';

export default class HairColorMaster extends BaseMaster {
  constructor(axios) {
    super(axios, 'hairColorMaster', 'beauty/hairColor/', {}, 'hair_color');
  }
}
