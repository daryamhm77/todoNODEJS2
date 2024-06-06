const TodoListModel = require('../model/todolist.model');

const get = async(req,res)=>{
    try {
        const todos = await TodoListModel.find();
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify(todos));
        res.end();
    } catch (error) {
        console.log(error);
    }
}

const getById = async(req,res)=>{
    try {
        const [,,,id] = req.url.split("/");
        const todo = await TodoListModel.findById(id);
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify(todo));
        res.end();
    } catch (error) {
        console.log(error);
    }
}
const create = async(req,res)=>{
    try {
        const body = '';
        req.on("data",(chunk)=>{
            body += chunk.toString();
        })
        req.on("end",async()=>{
            const todo = {...JSON.parse(body),createdAt:new Date()};
            const result = await TodoListModel.create(todo);
            res.writeHead(201,{"Content-Type":"application/json"})
            res.write(JSON.stringify(result))
            res.end()
        })
    } catch (error) {
        console.log(error);
    }
}
const update = async(req,res)=>{
    try {
        const body = '';
        const id = req.url.split("/")
        req.on('data',(chunk)=>{
            body+=chunk.toString()
        })
        const todo = {...JSON.parse(body)};
        const existedTodo = await TodoListModel.findById(id);
        if(!existedTodo){
            res.writeHead(404,{"Content-Type":"application/json"})
            res.write(JSON.stringify({
            message:"Route Not Found"
        }))

        }
        else{
            const result = await TodoListModel.update(id,todo);
            res.writeHead(200,{"Content-Type":"application/json"})
            res.write(JSON.stringify(result))
            res.end()
        }
    } catch (error) {
        console.log(error);
    }
}
const remove = async(req,res)=>{
    try {
        const[,,,id] = req.url.split("/")
        const existedTodo = await TodoListModel.findById(id);
        if(!existedTodo){
            res.writeHead(404,{"Content-Type":"application/json"})
            res.write(JSON.stringify({
            message:"Route Not Found"
        }))
        }else{
            const newProduct = await TodoListModel.remove(id)
            res.writeHead(200,{"Content-Type":"application/json"})
            res.write(JSON.stringify(newProduct))
            res.end()
        }
    } catch (error) {
        console.log(error);
    }
}

const todoListController = {
    get,
    getById,
    create,
    update,
    remove
}
module.exports = todoListController;