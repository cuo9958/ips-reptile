const puppeteer = require("puppeteer");
const webClient = require("./src/web");
const CronJob = require("cron").CronJob;

async function main() {
    const browser = await puppeteer.launch({
        defaultViewport: {
            width: 1400,
            height: 720
        },
        headless: false,
        slowMo: 10
    });
    //创建新的页面对象
    const page = await browser.newPage();
    const len = webClient.length;
    if (len === 0) return console.log("没有任务");
    let curr = 0;
    // webClient[curr](page, browser);
    new CronJob("*/10 * * * * *", async function() {
        try {
            await webClient[curr](page, browser);
        } catch (error) {
            console.log(error);
        } finally {
            curr++;
            if (curr >= len) curr = 0;
        }
    }).start();
}

main();
