const fs = require('fs')
const path = require('path')

/**
 * 拷贝文件夹内部的内容到另一个文件夹内部
 *
 * @param {String} from 源文件夹
 * @param {String} to 目标文件夹
 */
function _copyFromDirSync (from, to) {
  const dirs = fs.readdirSync(from)
  dirs.forEach(function (item) {
    const itemPath = path.join(from, item)
    const temp = fs.statSync(itemPath)
    if (temp.isFile()) { // 是文件
      fs.copyFileSync(itemPath, path.join(to, item))
    } else if (temp.isDirectory()) { // 是目录
      _copyFromDirSync(itemPath, path.join(to, item))
    }
  })
}

module.exports = {
  _copyFromDirSync
}
