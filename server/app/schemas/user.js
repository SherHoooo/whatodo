var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: Number,
        default: 0
    },
    //0: nomal user
    //1: verified user
    //2: professional user
    //>10: admin
    //>50: super admin
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next) {
    var user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }

    next()
})

//实例方法
UserSchema.methods = {
    comparePassword: function (_password, cb) {
        if (_password === this.password) cb(null, true)
        else cb('密码错误')
    }
}

//静态方法
UserSchema.statics = {
    fetch: function(cb) {
        return this
                .find({})
                .sort('meta.updateAt')
                .exec(cb)
    },
    findById: function(id, cb) {
        return this
                .findOne({_id: id})
                .exec(cb)
    }
}

module.exports = UserSchema
