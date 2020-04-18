const fs = require('fs')
const path = require('path')

/**
 * 拷贝文件夹
 *
 * @param {String} from 源文件夹
 * @param {Strinfg} to 目标文件夹
 * @param {Function} ignoreFunc 判断是否要过滤的函数，会将参数from传递过去
 */
function copyDirSync (from, to, ignoreFunc) {
  const hasIgnoreFunc = typeof ignoreFunc === 'function'
  if (hasIgnoreFunc && ignoreFunc(from)) {
    console.log(from)
    return
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to)
  }
  const dirs = fs.readdirSync(from)
  dirs.forEach(function (item) {
    const itemPath = path.join(from, item)
    const temp = fs.statSync(itemPath)
    if (temp.isFile()) { // 是文件
      if (!hasIgnoreFunc || !ignoreFunc(itemPath)) {
        fs.copyFileSync(itemPath, path.join(to, item))
      } else {
        console.log(itemPath)
      }
    } else if (temp.isDirectory()) { // 是目录
      copyDirSync(itemPath, path.join(to, item), ignoreFunc)
    }
  })
}

module.exports = {
  copyDirSync
}
