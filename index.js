const apis = require("./src/api2");
const CronJob = require("cron").CronJob;

async function main() {
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
