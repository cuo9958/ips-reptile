const axios = require("axios");
const config = require("config");
const saveData = require("./save");
const ipServer = require("./getips");
const fs = require("fs");
const path = require("path");
const utils = require("util");

const rootPath = path.resolve(__dirname, "../");

const amapkey = config.get("amapkey");
const bdak = config.get("bdak");

let amapCount = 0;
/**
 * 使用高德api
 */
async function amap() {
    if (amapCount > 300000) return;
    amapCount++;
    const ip = ipServer.getIps();
    try {
        const res = await axios.get("https://restapi.amap.com/v3/ip?ip=" + ip + "&key=" + amapkey);
        const data = res.data;
        if (data.status == 1 && data.infocode == "10000") {
            let province = data.province;
            if (typeof province == "object") {
                province = province.join(",");
            }
            let city = data.city;
            if (typeof city == "object") {
                city = city.join(",");
            }
            console.log("restapi.amap.com/v3/ip");
            saveData(
                {
                    ip,
                    address: province + " " + city,
                    province,
                    city,
                },
                !province
            );
        }
    } catch (error) {
        console.log(error);
    }
}
let bdCount = 0;
/**
 * 百度api调用
 */
async function baidumap() {
    if (bdCount > 30000) return;
    bdCount++;
    const ip = ipServer.getIps();
    try {
        const res = await axios.get("http://api.map.baidu.com/location/ip?ak=" + bdak + "&ip=" + ip);
        const data = res.data;
        if (data.status == 0) {
            let province = data.content.address_detail.province;
            let city = data.content.address_detail.city;
            let address = data.address;
            console.log("api.map.baidu.com/location/ip");
            saveData(
                {
                    ip,
                    address,
                    province,
                    city,
                },
                !address
            );
        }
    } catch (error) {
        console.log(error);
    }
}
/**
 * 淘宝的不稳定
 */
async function taobao() {
    const ip = ipServer.getIps();
    try {
        const res = await axios.get("http://ip.taobao.com/service/getIpInfo.php?ip=" + ip, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.7 Safari/537.36",
            },
        });
        const jsondata = res.data;
        if (jsondata.code === 0) {
            console.log("ip.taobao.com");
            const data = jsondata.data;
            const isp = data.isp || "";
            let province = data.region;
            if (province.toLowerCase() == "xx") throw new Error("查询失败");
            if (!["北京", "天津", "重庆"].includes(province)) {
                province = province + "省";
            }
            const city = data.city;
            console.log(
                {
                    province,
                    city,
                    isp,
                },
                data.country !== "中国"
            );
            // saveData(
            //     {
            //         province,
            //         city,
            //         isp,
            //     },
            //     data.country !== "中国"
            // );
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = [amap, baidumap];
