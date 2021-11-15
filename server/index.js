const express= require("express");
const mysql = require("mysql");
const cors = require("cors");

const app=express();

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"loginsystem"
})

app.post('/register',(req,res)=>{
    const username=req.body.username
    const password= req.body.password
console.log(username, password)

   db.query("INSERT INTO user (username,password) VALUES (?,?)",
    [username,password],
     (err,result)=>{
         if(err == "null"){
         console.log(err);
        }
        else{
    console.log(result)            
        }
    }
    );
});


app.post('/login',(req,res)=>{
    const username=req.body.username
    const password= req.body.password


    db.query("SELECT * FROM user WHERE username=?  AND password= ? ",
    [username,password],
     (err,result)=>{
        console.log(result) 
        if(err){
            res.send({err:err})
        } 
            if (result.length >0){
                res.send(result)
                console.log("login")
            } else{
                res.send({message:"Wrong username or password"});
            }
        }
        
    );
});


app.listen(3001,()=>{
    console.log("running server");
});