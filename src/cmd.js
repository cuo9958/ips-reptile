const os = require('os');
const child_process = require('child_process');
const fs = require('fs');
const archiver = require('archiver');

const isWindow = os.platform() === 'win32';
const spawn = child_process.execSync;

/**
 * 压缩文件夹
 * zipFiles('aaa.zip', 'package/*.js');
 * @param {*} src 目标地址
 * @param {*} source 来源文件/文件夹
 */
function zipFiles(src, source) {
    if (!isWindow) return spawn(`zip ${src} ${source}`);
    const output = fs.createWriteStream(src);
    const archive = archiver('zip');
    archive.pipe(output);
    if (/\*/.test(source)) {
        archive.glob(source);
    } else if (source.lastIndexOf('/') === source.length - 1) {
        archive.directory(source);
    } else archive.file(source);

    archive.finalize();
}

//删除文件夹下的所有文件
function _clearFiles(src) {
    const list = fs.readdirSync(src);
    list.forEach(ff => {
        const dirFile = src + '//' + ff;
        const st = fs.statSync(dirFile);
        if (st.isDirectory()) {
            _clearFiles(dirFile);
            return fs.rmdirSync(dirFile);
        }
        fs.unlinkSync(dirFile);
    });
}
/**
 * 删除目录内容并重新创建
 * @param {*} src 目录地址
 */
function clearDir(src) {
    if (!isWindow) return spawn(`rm -rf ${src} && mkdir ${src}`);
    try {
        _clearFiles(src);
    } catch (error) {
        console.log(error.message);
        fs.mkdirSync(src);
    }
}

/**
 * 添加目录
 * @param {*} src 目录名
 */
function mkDir(src) {
    if (!isWindow) return spawn(`mkdir ${src}`);
    try {
        fs.mkdirSync(src);
    } catch (error) {
        //
    }
}

/**
 * 移动文件
 * @param {*} oldSrc 旧地址
 * @param {*} newSrc 新地址
 */
function mvFile(oldSrc, newSrc) {
    if (!isWindow) return spawn(`mv ${oldSrc} ${newSrc}`);
    console.log(oldSrc, newSrc);
    fs.renameSync(oldSrc, newSrc);
}

module.exports = {
    zipFiles,
    clearDir,
    mkDir,
    mvFile
};
