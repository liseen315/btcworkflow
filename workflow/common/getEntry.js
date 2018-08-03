const path = require('path')
const glob = require('glob')

module.exports = function (dir, ext) {
  let files = glob.sync(dir + '/**/*.' + ext)
  let res = {}
  files.forEach(function (file) {
    let relativePath = path.relative(dir, file)
    let relativeName = relativePath.slice(0, relativePath.lastIndexOf('.'))

    res[relativeName] = './' + relativePath;
  });
  return res
}