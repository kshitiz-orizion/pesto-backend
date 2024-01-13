var mongoose = require('mongoose');
var Schema= mongoose.Schema;


var TodoSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    status: {type: String, required: true,enum: ['todo', 'in progress','done']},
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;