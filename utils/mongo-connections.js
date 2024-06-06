// const {MongoClient} = require("mongodb");

// module.exports = class ConnectToMongoDB{
//     #DB_URL = "localhost:27017/todoList";
//     #db = null;

//     async #connect(){
//         try {
//             let client = new MongoClient(this.#DB_URL);
//             let db = client.db();
//             return db;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async Get(){
//         try {
//             if(this.#db){
//                 console.log("the connection is already alive!");
//                 return this.#db
//             }
//             this.#db = await this.#connect();
//             return this.#db
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
// }
const MongoClient = require('mongodb').MongoClient;

let _db;  // <-- store the connection in this variable

async function connectDB() {
  if (_db) {
    console.log("Using existing connection");
    return _db;
  }

  let client;
  try {
    client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    _db = client.db('todo');
    console.log("New connection made");
    return _db;
  } catch (error) {
    console.error("Error creating new connection", error);
    throw error;
  }
}

module.exports = { connectDB };
