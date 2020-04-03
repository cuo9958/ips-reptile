const saveData = require("./save");
const ipServer = require("./getips");

const getIps=ipServer.getIps
/**
 * 网址https://www.ip138.com/iplookup.asp
 * @param {*} page page
 * @param {*} browser browser
 */
async function ip138(page, browser) {
    const ip = getIps();
    await page.goto("https://www.ip138.com/iplookup.asp?ip=" + ip + "&action=2");
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.querySelectorAll(".ul1 li");
        const res = [];
        lis.forEach(item => res.push(item.innerText));
        return res;
    });

    if (list.length !== 5) return;
    //ASN归属地：
    //参考数据1：
    //参考数据2：
    //兼容IPv6地址：
    //映射IPv6地址：
    console.log(page.url());
    const address = list[1].replace("参考数据1：", "");
    const d1 = list[2].replace("参考数据2：", "");
    const ip6 = list[4].replace("映射IPv6地址：", "");
    const ip6v = list[3].replace("兼容IPv6地址：", "");

    saveData({
        ip,
        address,
        ip6,
        ip6v,
        d1
    });
}
/**
 * https://www.ip.cn/?ip=223.223.192.87
 * @param {*} page page
 * @param {*} browser browser
 */
async function ipcn(page, browser) {
    const ip = getIps();
    await page.goto("https://www.ip.cn/?ip=" + ip);
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.querySelectorAll(".well code");
        const res = [];
        lis.forEach(item => res.push(item.innerText));
        return res;
    });

    if (list.length < 2) return;
    console.log(page.url());
    const address = list[1].replace(" ", "");
    saveData({
        ip,
        address
    });
}

/**
 * http://ip.tool.chinaz.com/223.223.192.87
 * @param {*} page page
 * @param {*} browser browser
 */
async function chinaz(page, browser) {
    const ip = getIps();
    await page.goto("http://ip.tool.chinaz.com/" + ip);
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.querySelectorAll(".Whwtdhalf.w50-0");
        const res = [];
        lis.forEach(item => res.push(item.innerText));
        return res;
    });

    if (list.length < 2) return;
    console.log(page.url());
    const address = list[1].replace(" ", "");
    saveData({
        ip,
        address
    });
}
/**
 * http://www.882667.com/ip_223.223.192.87.html
 * @param {*} page page
 * @param {*} browser browser
 */
// async function w882667(page, browser) {
//     const ip = getIps();
//     await page.goto("http://www.882667.com/ip_" + ip + ".html");
//     await page.waitFor(1000);
//     const list = await page.evaluate(() => {
//         const lis = document.querySelectorAll(".shuru.biankuang span");
//         const res = [];
//         lis.forEach(item => res.push(item.innerText));
//         return res;
//     });

//     if (list.length < 2) return;
//     console.log(page.url())
//     const address = list[2].replace(" ", "");
//     const latitude = list[4].replace(" ", "");
//     const longitude = list[5].replace(" ", "");
//     saveData({
//         ip,
//         address,
//         latitude,
//         longitude
//     });
// }
/**
 * http://ip.t086.com/?ip=223.223.192.87
 * @param {*} page page
 * @param {*} browser browser
 */
async function t086(page, browser) {
    const ip = getIps();
    await page.goto("http://ip.t086.com/?ip=" + ip);
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.querySelectorAll(".f1");
        const res = [];
        res.push(lis[0].innerText);
        const lis2 = document.querySelectorAll(".bar2")[1];
        const lis3 = lis2.innerHTML.split("</h2>");
        if (lis3.length > 1) {
            const lis6 = lis3[1].split("<br>");
            if (lis6.length > 1) {
                const lis4 = lis6[lis6.length - 1];
                const lis5 = lis4.split(" ");
                if (lis5.length > 1) {
                    res.push(lis5[0].replace("经度：", ""));
                    res.push(lis5[1].replace("纬度：", ""));
                }
            }
        }

        return res;
    });

    if (list.length < 2) return;
    console.log(page.url());
    const address = list[0];
    const latitude = list[1];
    const longitude = list[2];
    saveData({
        ip,
        address,
        latitude,
        longitude
    });
}
/**
 * https://www.hao7188.com/ip/223.223.192.12.html
 * @param {*} page page
 * @param {*} browser browser
 */
async function hao7188(page, browser) {
    const ip = getIps();
    await page.goto("https://www.hao7188.com/ip/" + ip + ".html");
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.querySelectorAll(".table-condensed td span");
        const res = [];
        lis.forEach(item => res.push(item.innerText));
        return res;
    });

    if (list.length < 2) return;
    console.log(page.url());
    const address = list[0];
    const d1 = list[2];
    saveData({
        ip,
        address,
        d1
    });
}
/**
 * http://ip.yqie.com/ip.aspx?ip=223.223.192.87
 * @param {*} page page
 * @param {*} browser browser
 */
async function yqie(page, browser) {
    const ip = getIps();
    await page.goto("http://ip.yqie.com/ip.aspx?ip=" + ip);
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.querySelectorAll(".displayno_address")[0].value;
        return [lis];
    });

    if (list.length === 0) return;
    console.log(page.url());
    const address = list[0];
    saveData({
        ip,
        address
    });
}
/**
 * https://ip.51240.com/223.223.192.12__ip/
 * @param {*} page page
 * @param {*} browser browser
 */
async function ip51240(page, browser) {
    const ip = getIps();
    await page.goto("https://ip.51240.com/" + ip + "__ip/");
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.querySelectorAll("table");
        const res = [];
        if (lis.length === 4) {
            const lis2 = lis[3].querySelectorAll("td");
            res.push(lis2[3].innerText);
        }
        return res;
    });

    if (list.length === 0) return;
    console.log(page.url());
    const address = list[0];
    saveData({
        ip,
        address
    });
}
/**
 * https://q.ip5.me/q.php
 * @param {*} page page
 * @param {*} browser browser
 */
async function ip5(page, browser) {
    const ip = getIps();
    await page.goto("https://q.ip5.me/q.php");
    await page.waitFor(1000);

    await page.evaluate(ip => {
        document.querySelectorAll("input")[0].value = ip;
    }, ip);

    await page.tap("input[type=submit]");
    await page.waitFor(1000);
    const list = await page.evaluate(() => {
        const lis = document.getElementById("ip_pos");
        return [lis.innerText];
    });

    if (list.length === 0) return;
    console.log(page.url());
    const address = list[0];
    saveData({
        ip,
        address
    });
}

module.exports = [
    ip138,
    ipcn,
    chinaz,
    // w882667,
    t086,
    hao7188,
    yqie,
    ip51240,
    ip5
];
