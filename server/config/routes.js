var User = require('../app/controllers/user')
var Tasklist = require('../app/controllers/tasklist')
var Task = require('../app/controllers/task')

const VISION = '/api/v1'
module.exports = function(app) {
    //User
    app.post(VISION + '/sign', User.signup)
    app.post(VISION + '/auth', User.signin)

    //Tasklist
    app.get(VISION + '/tasksdata', Tasklist.list)
    app.post(VISION + '/addlist', Tasklist.new)
    app.post(VISION + '/dellist', Tasklist.del)
    app.post(VISION + '/delalltask', Tasklist.delAll)
    app.post(VISION + '/renamelist', Tasklist.rename)

    // Task
    app.post(VISION + '/addtask', Task.save)
    app.post(VISION + '/changestatus', Task.save)
    app.post(VISION + '/deltask', Task.del)

    // Calendar
    app.get(VISION + '/calendardata', Task.calendar)
}
