const ConnectToMongoDB = require('../utils/mongo-connections').connectDB;
const {ObjectId} = require("mongodb")
const todoCollection = "todoList";

async function find(){
    const db = await ConnectToMongoDB();
    return new Promise(async(resolve, reject) => {
        const todoLists = await db.collection(todoCollection).find({},
            {
            sort:{
                _id:-1
            }
            }
        ).toArray();
        resolve(todoLists)
    })
}

async function findById(id){
    const db = await ConnectToMongoDB();
    return new Promise(async(resolve, reject) => {
        const todoListId = await db.collection(todoCollection).findOne({_id:new ObjectId(id)})
        resolve(todoListId)
    })
}

async function create(todo){
    const db = await ConnectToMongoDB();
    return new Promise(async(resolve, reject) => {
        const newTodo = await db.collection(todoCollection).insertMany(todo)
        resolve(newTodo);
    })
}

async function update(id,payload){
    const db = await ConnectToMongoDB();
    return new Promise(async(resolve, reject) => {
        const updateTodo = await db.collection(todoCollection).updateOne({_id:new ObjectId(id)},{
            $set:{...payload},
            
        })
      
        resolve(updateTodo)
    })
}

async function remove(id){
    const db = await ConnectToMongoDB();
    return new Promise(async(resolve, reject) => {
        const removeTodo = await db.collection(todoCollection).deleteOne({_id:new ObjectId(id)})
    })
}

const TodoListModel = {
    create,
    find,
    findById,
    update,
    remove
}
module.exports = TodoListModel;