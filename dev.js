const puppeteer = require("puppeteer");
const webClient = require("./src/web");
const apis = require("./src/apis");
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
    if (len > 0) {
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

    let apiIndex = 0;
    new CronJob("*/5 * * * * *", async function() {
        try {
            await apis[apiIndex]();
        } catch (error) {
            console.log(error);
        } finally {
            apiIndex++;
            if (apiIndex >= apis.length) apiIndex = 0;
        }
    }).start();
}

main();
