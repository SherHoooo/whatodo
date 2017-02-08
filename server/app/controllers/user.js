var User = require('../models/user')


//signup
exports.showSignup = function(req, res) {
    res.render('signup', {
        title: '注册页面'
    })
}

exports.showSignin = function(req, res) {
    res.render('signin', {
        title: '登录页面'
    })
}

exports.signup = function(req, res) {
    var _user = {
        name: req.body.nickname,
        email: req.body.email,
        password: req.body.password
    }
    var _user = new User(_user)
    User.findOne({email: _user.email}, function(err, user) {
        if(err) console.log(err)
        if(user) return res.redirect('/login')
        _user.save(function(err, user) {
            if(err) console.log(err)
            res.json({
                "status": 200,
                "message": "success",
                "user": user
            })
        })
    })
}

//signIn
exports.signin = function(req, res) {
    var _user = {
        email: req.body.email,
        password: req.body.password
    }
    var email = _user.email
    var password = _user.password
    User.findOne({email: email}, function(err, user) {
        if(err) console.log(err)
        if(!user) return res.redirect('/login')

        user.comparePassword(password, function(err, isMatch) {
            if(err) console.log(err)
            if(isMatch) {
                return res.json({
                    "status": 200,
                    "message": "success",
                    "user": user
                })
            }
            else {
                res.json({
                    "status": 0,
                    "message": "password error"
                })
            }
        })
    })
}

//logout
exports.logout = function(req, res) {
    delete req.session.user
    res.redirect('/')
}

//delete user
exports.del = function(req, res) {
    var id = req.query.id

    if(id) {
        User.remove({_id: id}, function(err, user) {
            if(err) {
                console.log(err)
            }
            else {
                res.json({errorCode: 1})
            }
        })
    }
    else res.json({errorCode: 0})
}

//userlist page
exports.list = function(req, res) {
    User.fetch(function(err, users) {
        if(err) {
            console.log(err)
        }
        res.render('userlist', {
            title: 'imooc 用户列表页',
            users: users
        })
    })
}

//midware for user
exports.signinRequired = function(req, res, next) {
    // var user = req.session.user
    // console.log(req.cookies)
    // if(!user) return res.redirect('/login')
    next()
}

//admin midware for user
exports.adminRequired = function(req, res, next) {
    var user = req.session.user
    if(user.role <= 10) return res.redirect('/signin')
    next()
}
