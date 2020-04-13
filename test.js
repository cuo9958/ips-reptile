let str = [];
//1021
for (let index = 1000; index < 1021; index++) {
    const name = "t_ips_" + ((index % 255) + "").padStart(3, "0") + (index % 4);
    str.push(`ALTER TABLE ${name} ADD COLUMN isp varchar(100) DEFAULT '' COMMENT '运营商';`);
}
console.log(str.join(""));
