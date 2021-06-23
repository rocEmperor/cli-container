let spawn = require("child_process").spawn;
/**
 * @returns 执行cmd命令
 */
function spawnFn (...args) {
    const ora = require('ora')
    const loading = ora(`🚀  installing...`)
    return new Promise(function(resolve, reject) {
        loading.start()
        let result = spawn(...args);
        result.stdout.pipe(process.stdout)
        result.stderr.pipe(process.stderr)
        result.on('close', () => {
            loading.succeed()
            resolve()
        })
    });
};
module.exports = {
    spawnFn
}