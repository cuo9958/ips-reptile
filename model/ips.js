const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../db/mysql");

const Ips = db.define(
    "t_ips",
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

//强制初始化数据库
// Ips.sync({ force: true });

module.exports = {
    create: function(model) {
        return Ips.create(model);
    },
    get: function(ip) {
        return Ips.findOne({
            where: {
                ip
            }
        });
    },
    update: function(model, ip) {
        return Ips.update(model, {
            where: { ip }
        });
    },
    getCount(limit = 1, name = "") {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [["id", "desc"]],
            attributes: ["id", "name", "size", "type", "clientid", "createdAt"]
        };
        if (name) {
            config.where = {
                name: {
                    [Op.like]: "%" + name + "%"
                }
            };
        }
        return Ips.findAndCountAll(config);
    },
    del: function(id) {
        return Ips.findOne({
            where: { id }
        }).then(function(res) {
            return res.destroy();
        });
    }
};
