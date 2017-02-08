var mongoose = require('mongoose')
var TasklistSchema = require('../schemas/tasklist')
var Tasklist = mongoose.model('Tasklist', TasklistSchema)

module.exports = Tasklist
