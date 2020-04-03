/**
 * 顺序获取ip
 */
const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "../");

const filePath = rootPath + "/tmp/curip.json";

let curip = {
    i1: 0,
    i2: 0,
    i3: 0,
    i4: 0
};

fs.exists(filePath, e => {
    if (!e) {
        fs.mkdirSync(rootPath + "/tmp");
        save();
    }
});
/**
 * 获取当前的ip
 */
function getNow() {
    let str = "";
    try {
        str = fs.readFileSync(filePath, { encoding: "utf8" });
        console.log("读取缓存", str);
        curip = JSON.parse(str);
    } catch (error) {
        console.log(error);
    }
    curip.i1++;
    if (curip.i1 >= 255) {
        curip.i2++;
    }
    if (curip.i2 >= 255) {
        curip.i3++;
    }
    if (curip.i3 >= 255) {
        curip.i4++;
    }
    if (curip.i1 === 255 && curip.i2 === 255 && curip.i3 === 255 && curip.i4 === 255) return null;
}

function save() {
    fs.writeFileSync(filePath, JSON.stringify(curip));
}

module.exports = function() {
    const bl = getNow();
    if (bl === null) {
        curip = {
            i1: 0,
            i2: 0,
            i3: 0,
            i4: 0
        };
    }
    save();
    return `${curip.i1}.${curip.i2}.${curip.i3}.${curip.i4}`;
};
