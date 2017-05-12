'use strict';

import * as SvgModules from 'react-native-svg';
let { Svg } = SvgModules;
for (let key in SvgModules) {
  if (key !== 'default' && key !== 'Svg') {
    Svg[key] = SvgModules[key];
  }
}
export default Svg;
