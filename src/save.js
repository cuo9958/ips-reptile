const ipsModel = require("../model/ips");

const def = {
    ip: "",
    address: "",
    ip6: "",
    ip6v: "",
    d1: "",
    //纬度
    latitude: "",
    //经度
    longitude: "",
    province: "",
    city: "",
    //是否国外，1国外
    abroad: 0,
};
//ip,address,ip6,ip6v,d1
const saveData = async (data, other) => {
    let objs = Object.assign({}, def, data);
    for (const key in objs) {
        if (objs[key] === undefined || objs[key] === null) {
            objs[key] = "";
        }
    }
    console.log("保存数据到数据库", objs);
    if (!objs.ip) return console.log("ip错误");
    if (other) {
        objs.abroad = 1;
    } else {
        if (!objs.address.trim()) return console.log("空地址错误");
    }
    const model = await ipsModel.get(objs.ip);
    if (!model) {
        ipsModel.create(objs);
    } else {
        ipsModel.update(objs, objs.ip);
    }
};

module.exports = saveData;
