// ルーティング処理の記載
import express,{Request,Response}  from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

type User = {
    id:number ,
    name:string,
}

let users:User[] = [
    { id: 1, name: "User1" },
    { id: 2, name: "User2" },
    { id: 3, name: "User3" }
]

app.get('/api/users', (req:Request, res:Response) => {
    res.json(users)
});

app.post("/api/user" ,(req:Request, res:Response) => {
    console.log("Request body",req.body)
    const requestName = req.body.name
    const usersExists = users.length > 0
    users.push({ id:  usersExists  ? users.slice(-1)[0].id + 1 : 1, name: requestName})
    res.json(users)
});

app.put("/api/user/:id",(req:Request, res:Response) => {
    console.log("Request pathId",req.params.id)
    console.log("Request body",req.body)
    const requestId = parseInt(req.params.id)
    const requestName = req.body.name
    users.forEach((user)=>{
        if(user.id === requestId) user.name = requestName
    })
    res.json(users)
});

app.delete("/api/user/:id",(req:Request, res:Response) => {
    console.log("Request pathId",req.params.id)
    const requestId = parseInt(req.params.id)
    users = users.filter((user) => user.id !== requestId)
    res.json(users)
});


app.get("*",(req:Request,res:Response) => {
    res.status(404).send("存在しないURLです")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));