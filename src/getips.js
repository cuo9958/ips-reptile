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
    i4: 0,
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
        curip.i1 = 0;
        curip.i2++;
    }
    if (curip.i2 >= 255) {
        curip.i2 = 0;
        curip.i3++;
    }
    if (curip.i3 >= 255) {
        curip.i3 = 0;
        curip.i4++;
    }
    //去掉局域网的查询
    if (curip.i1 === 10) curip.i1++;
    if (curip.i1 === 192 && curip.i2 === 168) curip.i2++;
    
    if (curip.i1 === 255 && curip.i2 === 255 && curip.i3 === 255 && curip.i4 === 255) return null;
}

function save() {
    fs.writeFileSync(filePath, JSON.stringify(curip));
}

function getIps() {
    const bl = getNow();
    console.log("=======", curip.i1, curip.i2, curip.i3, curip.i4, "=======");
    if (bl === null) {
        curip = {
            i1: 0,
            i2: 0,
            i3: 0,
            i4: 0,
        };
    }
    save();
    return `${curip.i1}.${curip.i2}.${curip.i3}.${curip.i4}`;
}

const rdips = new Set();

module.exports = {
    getIps,
    save,
    getNowIp() {
        const bl = getNow();
        if (bl === null) {
            curip = {
                i1: 0,
                i2: 0,
                i3: 0,
                i4: 0,
            };
        }
        return `${curip.i1}.${curip.i2}.${curip.i3}.${curip.i4}`;
    },
    getRandomIp() {
        function getOne() {
            return Math.round(Math.random() * 255);
        }
        let ip = `${getOne()}.${getOne()}.${getOne()}.${getOne()}`;
        if (rdips.has(ip)) {
            ip = `${getOne()}.${getOne()}.${getOne()}.${getOne()}`;
        }
        rdips.add(ip);
        return ip;
    },
};
