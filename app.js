var restify = require('restify');
var ip_addr = '127.0.0.1';
var port = '80';

var server = restify.createServer({
    name: "MonitoringServer"
});

server.get("/favicon.ico", function (req, res, next) {
    res.end();
});
var early_value = (function () {
    var temp_arr = [];
    for (var i = 0; i < 12; i++) {
        temp_arr[i] = Math.ceil(Math.random() * 99 + 1);
    }
    return temp_arr;
})();
var cir_init = function () {
    var title = [["IVR", "进线"], ["按键", "挂断"], ["人工", "队列"], ["自助", "服务"], ["热线", "自营"], ["热线", "外包"], ["PC", "自助"], ["人工", "在线服务"], ["无线", "自助"]];
    var cir_json = {};
    for (var i = 1; i < title.length + 1; i++) {
        var temp_json = {
            "title": title[i - 1],
        }
        if (i == 2) {
            temp_json.borderColor = "747E80";
            temp_json.ew_normal_fg = "#3E5158";
            temp_json.ew_normal_bg = "#747E80";
            temp_json.ew_normal_shadow = "#3E5158";
        }
        if (i == 5 || i == 6) {
            temp_json.ew_normal_fg = "#3C8AA1";
            temp_json.ew_normal_bg = "#3EAFCF";
            temp_json.ew_normal_shadow = "#2A4A55";
        }
        cir_json["circle_" + i] = temp_json;
    }
    return cir_json;
}

var hang_polling = function () {
    var hp = [];
    var hang_polling_title = [["挂断量"], ["流入量"], ["拨打量"], ["自助使用量", "人工转接率"], ["推送量", "使用量"], ["客户服务量"], ["流入量"]];
    for (var i = 0; i < hang_polling_title.length; i++) {
        var hpt = hang_polling_title[i];
        var temp_hpt = [];
        for (var n = 0; n < hpt.length; n++) {
            temp_hpt[n] = {
                title: hpt[n],
                value: Math.ceil(Math.random() * 9999 + 1)
            }
        }
        hp[i] = temp_hpt;
    }
    return hp;
}

var transfers_polling = function () {
    var transfers = [];
    for (var i = 0; i < 12; i++) {
        transfers.push(Math.ceil(Math.random() * 9999 + 1));
    }
    return transfers;
}

var early_polling = function () {
    var cir_earlyVal = [];
    console.log(early_value);
    for (var i = 0; i < 9; i++) {
        var rand = Math.round(Math.random() * 1);
        var temp_ev = early_value[i];
        if (temp_ev >= 100 || temp_ev <= 0) {
            temp_ev = Math.ceil(Math.random() * 99 + 1);
        } else {
            if (rand) {
                temp_ev++;
            } else {
                temp_ev--;
            }
        }
        early_value[i] = temp_ev;
        cir_earlyVal.push(temp_ev);
    }
    return cir_earlyVal;
}

server.get('/init/:channel', function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    console.log(" channerl :[%s]", req.params.channel);
    switch (req.params.channel) {
    case "initCir":
        res.json(cir_init());
    default:
        next();
    }
});


server.get('/polling/:node', function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    switch (req.params.node) {
    case "transfers":
        res.json(transfers_polling());
        return next();
    case "earlyVal":
        res.json(early_polling());
        return next();
    case "hangVal":
        res.json(hang_polling());
        return next();
    }
});



server.get(/[\s\S]*/, function (req, res, next) {
    console.log(" URL : " + req.url + " Times : " + new Date().toLocaleTimeString());
    return next(new restify.ConflictError("i just don't like u"));
});

server.listen(port, ip_addr, function () {
    console.log('%s listening at %s', server.name, server.url);
});
