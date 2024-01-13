var express=require('express');
var router=express.Router();
var Todo=require('../model/todo');
router.get('/todo', async function (req, res) {
    try{
        const todoList = await Todo.find()
        return res.json(todoList)
    }
    catch(e){
        return res.json({"message":"something went wrong", error: e?.message})
    }
});

router.get('/todo/:id', async function (req, res) {
    try{
        const todo = await Todo.findOne({_id:req.params.id});
        if(!todo){
            return res.json({"message":"Todo not found"})
        }
        return res.json(todo);
    }
    catch(e){
        return res.json({"message":"something went wrong", error:e?.message})
    }
});

router.post('/todo', async function(req, res) {
    try{
        const todo = new Todo({...req.body});
        const savedTodo = await todo.save();
        return res.json(savedTodo)
    }
    catch(e){
        return res.json({"message":"something went wrong", error: e?.message})
    }
});

router.delete('/todo/:id', async function(req, res){
  try{
    const todo = await Todo.findByIdAndDelete({_id:req.params.id})
    return res.json({"message":"deleted successfully", "body": todo})
  }
  catch(e){
    return res.json({"message":"something went wrong",error: e?.message})
}
});

router.put('/todo/:id', async function(req, res){
    try{
        var query = {
            _id:req.params.id
          };
        const todo = await Todo.findOneAndUpdate({...query},{...req.body},{new:true, upsert: true});
        return res.json(todo)
      }
      catch(e){
        return res.json({"message":"something went wrong",error: e?.message})
    }
});


module.exports=router;