const axios = require("axios");
const config = require("config");
const saveData = require("./save");
const getIps = require("./getips");

const amapkey = config.get("amapkey");
const bdak = config.get("bdak");

let amapCount = 0;
/**
 * 使用高德api
 */
async function amap() {
    if (amapCount > 300000) return;
    amapCount++;
    const ip = getIps();
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
            saveData({
                ip,
                address: province + " " + city,
                province,
                city
            });
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
    const ip = getIps();
    try {
        const res = await axios.get("http://api.map.baidu.com/location/ip?ak=" + bdak + "&ip=" + ip);
        const data = res.data;
        if (data.status == 0) {
            let province = data.content.address_detail.province;
            let city = data.content.address_detail.city;
            let address = data.address;
            console.log("api.map.baidu.com/location/ip");
            saveData({
                ip,
                address,
                province,
                city
            });
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = [amap, baidumap];
