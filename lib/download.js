const { promisify } = require('util')
/**
 * 从github上pull代码至本地
 * @param {String} repo git远程仓库地址
 * @param {String} desc 代码pull成功后输出的根路径 
 */
module.exports.clone = async function(repo, desc) {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')
    const process = ora(`🚀  download >>>>>>> ${repo}`)
    process.start()

    await download(repo, desc)

    process.succeed()
}