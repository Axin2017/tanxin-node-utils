const fs = require('fs')
const path = require('path')

/**
 * 拷贝文件夹
 *
 * @param {String} from 源文件夹
 * @param {Strinfg} to 目标文件夹
 * @param {Function} ignoreFunc 判断是否要过滤的函数，function(itemPath: String)
 */
function copyDirSync (from, to, ignoreFunc) {
  const hasIgnoreFunc = typeof ignoreFunc === 'function'
  if (hasIgnoreFunc && ignoreFunc(from)) {
    return
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to)
  }

  const dirs = fs.readdirSync(from)
  dirs.forEach(function (item) {
    const itemPath = path.join(from, item)
    const stat = fs.statSync(itemPath)

    if (stat.isFile()) { // 是文件
      if (!hasIgnoreFunc || !ignoreFunc(itemPath)) {
        fs.copyFileSync(itemPath, path.join(to, item))
      }
    } else if (stat.isDirectory()) { // 是目录
      copyDirSync(itemPath, path.join(to, item), ignoreFunc)
    }
  })
}

module.exports = {
  copyDirSync
}
