var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var todo=require('./routes/todo');
var port=process.env.PORT || 5000;

var app=express();
mongoose.connect('mongodb://127.0.0.1:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => { 
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req,res,next){
	res.header('Access-control-Allow-Origin','*');
	res.header('Access-control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-control-Allow-Headers','Content-type');
	next();
})
app.use('/',todo);
app.listen(port,function(){
	console.log('server started on port'+port);
});