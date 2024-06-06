const http = require("http");
const url = require("url");
const PORT = 3000;



const todolistController = require("./controllers/todolist.controllers");
const notFoundController = require("./controllers/notFound.controller");

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    // res.writeHead(200,{"Content-Type":"text/plain"});
    // res.end(req.url);
    // if(req.url === '/todo'){
    //     console.log('1 todo');
    // }
     if(req.url == "/todo" || req.url==='/' && req.method === "GET"){
        todolistController.get(req,res);
    }else if(req.url.match(req.url.match(/\api\/todos\/[0-9]+/))){
        todolistController.getById(req,res);
    }else if(req.url == "/todo" && req.method === "POST"){
        todolistController.create(req,res);
    }else if(req.url == "/todo" && req.method === "PUT"){
        todolistController.update(req,res);
    }else if(req.url == "/todo" && req.method === "DELETE"){
        todolistController.remove(req,res);
    }else{
        notFoundController.notFound(res);
    }
})

server.listen(PORT);
console.log(`Run server on ${PORT} http://localhost:${PORT}`);