const fs = require('fs')
const path = require('path')

/**
 * 删除文件夹
 *
 * @param {String} dirPath 文件夹路径
 */
function rmDirSync (dirPath) {
  const dirs = fs.readdirSync(dirPath)

  dirs.forEach(function (item) {
    const itemPath = path.join(dirPath, item)
    const stat = fs.statSync(itemPath)

    if (stat.isFile()) {
      fs.unlinkSync(itemPath)
    } else if (stat.isDirectory()) {
      rmDirSync(itemPath)
    }
  })

  fs.rmdirSync(dirPath)
}

module.exports = {
  rmDirSync
}
