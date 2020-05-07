# ip 查询库

这是一个 ip 查询库，可以非常快速的查询到 ip 地址对应的城市和国家。

## 查询

1. 查询自己的 ip 地址：[http://ip.bxiaob.top/](http://ip.bxiaob.top/)
2. 查询 ip 地址对应的信息：[http://ip.bxiaob.top/223.223.100.100](http://ip.bxiaob.top/223.223.100.100)

## 返回信息

```json
{
    "code": 1, //状态值：0失败，1成功
    "data": {
        "cityCode": 0, //城市代码
        "country": "日本", //国家
        "region": "0", //区域，一般是0
        "province": "广岛县", //省份，国外部分有值
        "city": "0", //城市，国外部分有值
        "isp": "0" //运营商，国内有值
    },
    "msg": "" //失败信息
}
```
