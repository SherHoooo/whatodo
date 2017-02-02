var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('express-session')
// var mongoStore = require('connect-mongo')(session)
var logger = require('morgan');
var multipart = require('connect-multiparty')
var app = express()
var fs = require('fs')
var path = require('path')
var dbUrl = 'mongodb://127.0.0.1/blog'


//连接数据库
// mongoose.connect(dbUrl)

//常，变量定义
var port = 9020

//models loading
var models_path = __dirname + '/app/models'
var walk = function(path) {
    fs
        .readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file
            var stat = fs.statSync(newPath)

            if(stat.isFile()) {
                if(/(.*)\(js|coffee)/.test(file)) {
                    require(newPath)
                }
            }
            else if(stat.isDirectory()) {
                walk(newPath)
            }
        })
}

//中间件使用
app.use(express.static(path.join(__dirname, 'public' )))
app.use(multipart())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(session({
//     secret: 'blog',
//     store: new mongoStore({
//         url: dbUrl,
//         collection: 'sessions'
//     })
// }))

//开发环境设置
if('development' === app.get('env')) {
    app.set('showStackError', true)
    app.use(logger(':method :url :status')); //日志打印格式化
    app.locals.pretty = true //代码美化取消压缩
    mongoose.set('debug', true) //数据库debug模式
}

//路由引入
require('./config/routes')(app)

app.listen(port, function () {
    console.log('Listening on port' + port)
})
