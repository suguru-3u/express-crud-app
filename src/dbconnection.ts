import mysql from 'mysql';

class DBConnection {

    private dbHost:string;

    private user:string;

    private password:string;

    private database:string 

    constructor(){
        const { DBHOST, DBUSER , DBPASSWORD, DATABESENAME} = process.env
        if(!DBHOST || !DBUSER || !DBPASSWORD || !DATABESENAME) throw new Error("環境変数が設定されていません")
        this.dbHost = DBHOST
        this.user = DBUSER
        this.password = DBPASSWORD
        this.database = DATABESENAME
    }

    connect(){
        const con = mysql.createConnection({
            host: this.dbHost,
            user: this.user,
            password: this.password,
            database: this.database
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log('Connected');
        });
        return con
    }
}

export default DBConnection