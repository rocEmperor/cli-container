const fs = require('fs');
const path = require('path');
const colors = require("colors-console");

// 同步删除文件夹内的所有内容
function rmdir(dir) {
    let arr = [dir]
    let current = null
    let index = 0
 
    while(current = arr[index++]) {
        let stat = fs.statSync(current)
        if (stat.isDirectory()) {
            let files = fs.readdirSync(current)
            arr = [...arr, ...files.map(file => path.join(current, file))]
        }
    }
    // 遍历删除文件
    for (let i = arr.length - 1; i >= 0; i--) {
        let stat = fs.statSync(arr[i])
        if (stat.isDirectory()) {
            fs.rmdirSync(arr[i])
        } else {
            fs.unlinkSync(arr[i])
        }
    }
}

function getRootPath () {
    let target = process.cwd();
    let projectName = process.argv[process.argv.length - 1];
    let targetRoot = `${target}/${projectName}`;
    return targetRoot;
}

function log (msg) {
    console.log(colors('green', msg))
}

module.exports = {
    rmdir: rmdir,
    getRootPath: getRootPath,
    log: log
};
