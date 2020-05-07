const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const KoaBody = require("koa-body");
const Ip2region = require("node-ip2region");

const app = new Koa();
const router = new Router();
const dbPath = path.join(__dirname, "./db/ip2region.db");
const ip2 = Ip2region.create(dbPath);

app.use(KoaBody());

router.get("/", async function (ctx, next) {
    const ip = ctx.ip;
    const group = ip.match(/[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/);
    if (group.length > 0) {
        ctx.body = group[0];
    } else {
        ctx.body = "输入ip地址查询结果";
    }
});
router.get("/:ip", async function (ctx, next) {
    const ip = ctx.params.ip;

    if (/^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$/.test(ip)) {
        try {
            const res = ip2.memorySearchSync(ip);
            const list = res.region.split("|");
            const data = {
                cityCode: res.city,
                country: list[0],
                region: list[1],
                province: list[2],
                city: list[3],
                isp: list[4],
            };
            ctx.body = {
                code: 1,
                data,
            };
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: "查询失败",
                error: error.message,
            };
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "查询失败",
        };
    }
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 18700;
app.listen(port, function () {
    console.log("端口已监听", port);
});
