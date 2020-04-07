let str = [];
//1021
for (let index = 0; index < 1021; index++) {
    const name = "t_ips_" + ((index % 255) + "").padStart(3, "0") + (index % 4);
    str.push(name);
}
console.log(str[1020])
function getIndex(ip1, ip2) {
    const res = ip1 * ((ip2 % 4) + 1);
    if (isNaN(res)) return 0;
    console.log(res)
    return res;
}
getIndex("255","255")