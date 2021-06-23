const fs = require("fs");

// 将用户的自定义配置信息更新至package.json文件中
let configPackage = async (targetRoot, answers) => {
    let packagePath = `${targetRoot}/package.json`;
    // 将搜集的信息同步到lib/package.json
    let packageData = JSON.parse(fs.readFileSync(`${packagePath}`).toString());
    for (let k in answers) {
        packageData[k] = answers[k];
    }
    // 此种写法 可以格式化json，不然writeFile后是一行展示 很丑
    packageData = JSON.stringify(packageData, '', '\t');
    fs.writeFileSync(`${packagePath}`, packageData, 'utf8');
}

module.exports = {
    configPackage: configPackage
};