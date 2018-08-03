const path = require('path')
const glob = require('glob')

module.exports = function (dir, ext) {
  var files = glob.sync(dir + '/**/*.' + ext),
    res = {}

  files.forEach(function (file) {
    var relativePath = path.relative(dir, file),
      relativeName = relativePath.slice(0, relativePath.lastIndexOf('.'));

    res[relativeName] = './' + relativePath;
  });

  return res
}