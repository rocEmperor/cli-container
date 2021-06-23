const inquirer = require('inquirer');

const promptList = [
    {
        type: 'input',
        message: '请输入你的应用名称(name):',
        name: 'name',
        default: "app" // 默认值
    },
    {
        type: 'input',
        message: '请输入你的应用版本(version):',
        name: 'version',
        default: "1.0.0" // 默认值
    },
    {
        type: 'input',
        message: '请输入你的应用描述(description):',
        name: 'description',
        default: "" // 默认值
    }
];

/**
 * 在pull模板代码之前，询问用户一些问题，比如应用版本号，描述等，然后将搜集来的信息，同步到相应文件中
 */
const inquirerPrompt = async () => {
    return await inquirer.prompt(promptList)
}

module.exports = {
    inquirerPrompt: inquirerPrompt
};