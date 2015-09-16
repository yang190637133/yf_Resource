var express = require('express');
var fs = require('fs'),
    config = require('../config.json');
var url = require('url');
//path = require('path');

//文件路径
var filePath = (config.filePath=="")?"notice":config.filePath;
//图片路径
var img = (config.img=="")?"public/img":config.img;

var router = express.Router();

/**
 * 主页面
 */
router.get('/', function(req, res, next) {
    //上下文
    var path =  req.headers.host+req.originalUrl;
    console.dir(path);
    res.render('index', { title: config.itemName ,contextPath:path});
});

//获取path路径中的文件夹名称
router.post('/pathfs',function(req,res){
    //返回path路径中文件组名称
    var stats = fs.readdirSync(filePath);
    //console.dir("对象类型"+typeof(stats));
    //console.dir(stats.length);
    //console.dir("文件名称"+stats);
    res.send(stats);
    res.end();
});

//选择文件夹显示对应的项
router.post('/search_fs',function(req, res, next){
    //console.dir(req.body.itemName);
    //保存返回信息
    var data = [];
    //路径
    var chiledfilePath = filePath+"/"+req.body.itemName;
    //查询子目录
    var stats = fs.readdirSync(chiledfilePath);

    //获取子节点信息
    if(stats!==null || stats!== undefined){

        for(var i in stats){

            //获取子文件夹
            data[i] = {
                itemName:stats[i].split(".")[0],
                items:[]
            };

            //查询子目录中的文件
            var tempName = fs.readdirSync(chiledfilePath+"/"+stats[i]);

            //获取子文件夹中的文件信息
           if(tempName!==null || tempName!== undefined){
                var temp = [];
                //查询文件信息
                for(var j in tempName){
                    temp[j] = {
                        itemName:tempName[j].split(".")[0],
                        content:readfs(chiledfilePath+"/"+stats[i]+"/"+tempName[j])
                    };
                }
                data[i].items = temp;
            }
        }
        res.send(data);
        res.end();
    }

});

//读取文件将内容返回
function readfs(fileName){
    //读取文件
    var file = fs.readFileSync(fileName,'utf-8');
    return file;
}

router.post('/fs',function(req, res, next){
    //读取文件
    fs.readFile('../notice/message.txt', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(data);
        res.end();
    });
});

module.exports = router;
