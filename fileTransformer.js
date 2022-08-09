/*
 * @Author: mingyi.tang@effem.com mingyi.tang@effem.com
 * @Date: 2022-08-08 13:39:54
 * @LastEditors: mingyi.tang@effem.com mingyi.tang@effem.com
 * @LastEditTime: 2022-08-08 13:40:00
 * @FilePath: \shop-front\fileTransformer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');

module.exports = {
  process(sourceText, sourcePath, options) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`
    };
  }
};
