var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var TasklistSchema = new Schema({
    title: String,
    user: {
        type: ObjectId,
        ref: "User"
    },
    data: [{type: ObjectId, ref: "Task"}],
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

TasklistSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }
    next()
})

TasklistSchema.statics = {
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

module.exports = TasklistSchema
