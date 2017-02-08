//model层引入
var Tasklist = require('../models/tasklist')

// 新建列表
exports.new = function(req, res) {
    var _tasklist = req.body.tasklist
    var tasklist = new Tasklist(_tasklist)
    tasklist.save(function(err, list) {
        if(err) {
            console.log(err)
        }
        res.json({
            "msg": "success",
            "status": 200,
            "data": list
        })
    })
}

// 重命名列表
exports.rename = function(req, res) {
    var id = req.body.listid
    var index = req.body.listindex
    var title = req.body.title
    Tasklist.findOne({_id: id}, function(err, tasklist) {
        tasklist.title = title
        tasklist.save(function(err, tasklist) {
            if(err) {
                console.log(err)
                res.json({
                    "message": "delAllTaskError",
                    "status": 0
                })
            }
            else {
                res.json({
                    "message": "success",
                    "index": index,
                    "title": tasklist.title,
                    "status": 200
                })
            }
        })
    })
}

//删除列表
exports.del = function(req, res) {
    var id = req.body.listId
    var index = req.body.index
    Tasklist.remove({_id: id}, function(err, tasklist) {
        if(err) {
            console.log(err)
            res.json({
                "message": "delListError",
                "status": 0
            })
        }
        else {
            res.json({
                "message": "success",
                "index": index,
                "status": 200
            })
        }
    })
}

// 删除列表内所有任务
exports.delAll = function(req, res) {
    var id = req.body.listId
    var index = req.body.index
    Tasklist.findOne({_id: id}, function(err, tasklist) {
        tasklist.data = []
        tasklist.save(function(err, tasklist) {
            if(err) {
                console.log(err)
                res.json({
                    "message": "delAllTaskError",
                    "status": 0
                })
            }
            else {
                res.json({
                    "message": "success",
                    "index": index,
                    "status": 200
                })
            }
        })
    })
}


//catelist page
exports.list = function(req, res) {
    var id = req.query._id
    Tasklist
            .find({user: id})
            .populate('data')
            .exec(function(err, tasklist) {
                var response = {
                    "message": "success",
                    "data": tasklist,
                    "status": 200
                }
                res.json(response)
            })
}