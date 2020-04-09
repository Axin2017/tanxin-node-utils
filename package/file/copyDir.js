const fs = require('fs')
const { _copyFromDirSync } = require('./_copyDir')

/**
 * 拷贝文件夹
 *
 * @param {String} from 源文件夹
 * @param {Strinfg} to 目标文件夹
 */
function copyDirSync (from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to)
  }
  _copyFromDirSync(from, to)
}

module.exports = {
  copyDirSync
}
