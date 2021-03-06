//model层引入
var Task = require('../models/task')
var Tasklist = require('../models/tasklist')

exports.save = function(req, res) {
    var taskId = req.body.taskId
    if (taskId) {
        var status = parseInt(req.body.status)
        var taskIndex = req.body.taskindex
        var listIndex = req.body.listindex
        Task.findById(taskId, function(err, task) {
            if(err) {
                console.log(err)
            }
            task.status = status
            task.save(function(err, _task) {
                if(err) console.log(err)
                else {
                    res.json({
                        "message": "success",
                        "data": _task,
                        "listindex": listIndex,
                        "taskindex": taskIndex,
                        "status": 200
                    })
                }
            })
        })
    }
    else {
        var taskObj = {
            title: req.body.title,
            deadline: req.body.deadline,
            priority: req.body.priority,
            status: req.body.status,
            user: req.body.user
        }
        var userId = req.body.user
        var listId = req.body.listid
        var listIndex = req.body.index
        _task = new Task(taskObj)
        _task.save(function(err, task) {
            if(err) {
                console.log(err)
                res.json({"message": "saveTaskError", "status": 0})
            }
            if (listId) {
                Tasklist.findById(listId, function(err, tasklist) {
                    tasklist.data.push(task._id)
                    tasklist.save(function(err, tasklist) {
                        res.json({
                            "message": "success",
                            "data": task,
                            "index": listIndex,
                            "status": 200
                        })
                    })
                })
            }
            else {
               res.json({"message": "lackOfParam", "status": 0})
            }
        })
    }
    
}

//删除列表
exports.del = function(req, res) {
    var taskId = req.body.taskId
    var taskIndex = req.body.taskindex
    var listIndex = req.body.listindex
    Task.remove({_id: taskId}, function(err, task) {
        if(err) {
            console.log(err)
            res.json({
                "message": "delTaskError",
                "status": 0
            })
        }
        else {
            res.json({
                "message": "success",
                "listindex": listIndex,
                "taskindex": taskIndex,
                "status": 200
            })
        }
    })
}

// 日历数据
exports.calendar = function(req, res) {
    var userId = req.query.user
    Task.find({user: userId}, function(err, tasks) {
        var calendarData = {}
        tasks.map(function(val) {
            var deadline = val.deadline || val.meta.createAt
            deadline = new Date(deadline)
            var date = deadline.getDate()
            var month = deadline.getMonth() + 1
            var year = deadline.getFullYear()
            var prop = '' + year + month + date 
            if (calendarData[prop]) calendarData[prop].push({
                title: val.title,
                status: val.status,
                priority: val.priority,
                id: val._id
            })
            else {
                calendarData[prop] = [{
                    id: val._id,
                    title: val.title,
                    status: val.status,
                    priority: val.priority
                }]
            }
        })
        res.json({
                "message": "success",
                "data": calendarData,
                "status": 200
            })
    })

}