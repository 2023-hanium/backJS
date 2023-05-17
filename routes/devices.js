var express=require("express");
var router=express.Router();
const mqtt=require("mqtt");
const DHT11=require("../models/DHT11");

// mosquitto에 접속하기
const client=mqtt.connect("mqtt://172.30.1.44");

// http://172.30.1.44:3000/devices/led
// {"flag" : value}
router.post("/led", function(req, res, next){ 
    res.set("Content-Type", "text/json");
    if(req.body.flag=="on"){
        client.publish("led", "1");
        res.send(JSON.stringify({led : "on"}));
    }else{
        client.publish("led", "2");
        res.send(JSON.stringify({led : "off"}));
    }
 });
 router.post("/device", function(req, res, next){ 
    console.log(req.body.sensor);
    if(req.body.sensor=="dht11"){
        DHT11.find({}).sort({ created_at: -1}).limit(10).then(data=>{
            res.send(JSON.stringify(data));
        });
    }else{
        // 다른센서 데이터 가져오기
    }

 });
 // 안드로이드에서 요청 받기

 module.exports = router;