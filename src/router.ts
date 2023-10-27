// ルーティング処理の記載
import express,{Request,Response}  from "express"
import bodyParser from "body-parser"
import DBConnection from "./dbconnection"

const app = express();
const port = 3000;

const dbconnection = new DBConnection()
const con = dbconnection.connect()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/api/users', (req:Request, res:Response) => {
    const sql = 'select * from employy_information';
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result)
    });
});

app.post("/api/user" ,(req:Request, res:Response) => {
    console.log("Request body",req.body)
    const requestName = req.body.name
    if(!requestName)return res.send("リクエスト内容が正しくありません")
    const post  = [[requestName]];
    const sql = 'insert into employy_information(EMPLOYEE_NAME) values(?)';
    con.query(sql, post, (error, results, fields) => {
        if (error) throw error;
        const sql = 'select * from employy_information';
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
      });
});

app.put("/api/user/:id",(req:Request, res:Response) => {
    console.log("Request pathId",req.params.id)
    console.log("Request body",req.body)
    const requestId = parseInt(req.params.id)
    const requestName = req.body.name
    if(!requestId || !requestName) return res.status(400).send("リクエスト内容が正しくありません")
    const sql = "update employy_information set EMPLOYEE_NAME = ? where EMPLOYEE_ID = ? "
    const data = [requestName,requestId]
    con.query(sql, data ,function (err, result, fields) {
        if (err) throw err;
        const sql = 'select * from employy_information';
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    });
});

app.delete("/api/user/:id",(req:Request, res:Response) => {
    console.log("Request pathId",req.params.id)
    const requestId = parseInt(req.params.id)
    if(!requestId)return res.send("リクエスト内容が正しくありません")
    const sql = "delete from employy_information where EMPLOYEE_ID = ? "
    const data  = [[requestId]];
    con.query(sql, data ,function (err, result, fields) {
        if (err) throw err;
        const sql = 'select * from employy_information';
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    });
});


app.get("*",(req:Request,res:Response) => {
    res.status(404).send("存在しないURLです")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));