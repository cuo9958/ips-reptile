const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../db/mysql");

const models = [];

for (let index = 0; index < 1021; index++) {
    const name = "t_ips_" + ((index % 255) + "").padStart(3, "0") + (index % 4);
    const Ips = db.define(
        name,
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            ip: {
                type: Sequelize.STRING(20),
                defaultValue: "",
                comment: "ip"
            },
            ip1: {
                type: Sequelize.STRING(20),
                defaultValue: "",
                comment: "ip1"
            },
            ip2: {
                type: Sequelize.STRING(20),
                defaultValue: "",
                comment: "ip2"
            },
            ip3: {
                type: Sequelize.STRING(20),
                defaultValue: "",
                comment: "ip3"
            },
            ip4: {
                type: Sequelize.STRING(20),
                defaultValue: "",
                comment: "ip4"
            },
            address: {
                type: Sequelize.STRING,
                defaultValue: "",
                comment: "地址"
            },
            ip6: {
                type: Sequelize.STRING(50),
                defaultValue: "",
                comment: "ip6"
            },
            ip6v: {
                type: Sequelize.STRING(50),
                defaultValue: "",
                comment: "ip6兼容"
            },
            d1: {
                type: Sequelize.STRING,
                defaultValue: "",
                comment: "备用数据1"
            },
            latitude: {
                type: Sequelize.STRING(50),
                defaultValue: "",
                comment: "纬度"
            },
            longitude: {
                type: Sequelize.STRING(50),
                defaultValue: "",
                comment: "经度"
            },
            province: {
                type: Sequelize.STRING(100),
                defaultValue: "",
                comment: "省"
            },
            city: {
                type: Sequelize.STRING(100),
                defaultValue: "",
                comment: "省"
            }
        },
        {
            freezeTableName: true,
            indexes: [
                {
                    unique: true,
                    fields: ["ip"]
                }
            ]
        }
    );
    models.push(Ips);
    //强制初始化数据库
    // Ips.sync({ force: true });
}
//拆解ip
function getip12(ip) {
    const list = ip.split(".");
    if (list.length < 4) throw new Error("不存在的ip");
    return {
        ip1: list[0],
        ip2: list[1],
        ip3: list[2],
        ip4: list[3]
    };
}
function getIndex(ip1, ip2) {
    const res = ip1 * ((ip2 % 4) + 1);
    if (isNaN(res)) return 0;
    return res;
}
module.exports = {
    create: function(model) {
        if (!model.ip) return;
        const data = getip12(model.ip);
        let index = getIndex(data.ip1, data.ip2);
        const ipmodel = models[index];
        if (!ipmodel) return;
        model.ip1 = data.ip1;
        model.ip2 = data.ip2;
        model.ip3 = data.ip3;
        model.ip4 = data.ip4;
        return ipmodel.create(model);
    },
    get: function(ip) {
        if (!ip) return;
        const data = getip12(ip);
        let index = getIndex(data.ip1, data.ip2);
        const ipmodel = models[index];
        if (!ipmodel) return;
        return ipmodel.findOne({
            where: {
                ip
            }
        });
    },
    update: function(model, ip) {
        if (!ip) return;
        const data = getip12(ip);
        let index = getIndex(data.ip1, data.ip2);
        const ipmodel = models[index];
        if (!ipmodel) return;
        return ipmodel.update(model, {
            where: { ip }
        });
    }
};
