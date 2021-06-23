#! /usr/bin/env node
/**
 * 发布 npm publish --access=public
 */
const fs = require("fs");
const util = require("./lib/util");
const { clone } = require('./lib/download');
const { configPackage } = require('./lib/configPackage');
const { inquirerPrompt } = require('./lib/prompt');
const { spawnFn } = require('./lib/spawn');
const { program } = require('commander')

let run = async (projectName) => {
    // 基本问询信息搜集
    let answers = await inquirerPrompt()

    // 获取output的目标根路径
    let targetRoot = util.getRootPath()

    // 判断目标output根路径是否存在，如果存在，先删除，再创建新的根路径
    if (fs.existsSync(targetRoot)) {
        util.log('正在删除原有的文件，请稍后...')
        util.rmdir(targetRoot)
        util.log('删除成功!')
    }

    // 将远程仓库中的脚手架模板copy至目标文件夹下
    util.log(`创建项目 ${projectName}`)
    await clone('https://github.com:rocEmperor/lian-web-tpl', targetRoot)
    util.log('创建完成!')

    // 安装依赖
    util.log('安装依赖，请稍等...')
    await spawnFn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: util.getRootPath() })
    util.log('安装完成!')

    // 更新package.json文件
    await configPackage(targetRoot, answers)

    util.log(`>>>>>>>>>>>>>>> 模板初始化完成 请开始你的表演 <<<<<<<<<<<<<<<`)
}

program
    .command('help')
    .description('show help info')
    .action((projectName, destination) => {
        util.log(`create a project by entry 'lian-web-cli create hello-world'`)
    })
program
    .command('create <projectName>')
    .description('create a projectName from github')
    // .option('-h, --help', 'help info')
    .action((projectName, destination) => {
        // 主执行函数
        run(projectName)
    })
program.parse(process.argv)