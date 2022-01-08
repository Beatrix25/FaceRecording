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

app.post('/addpresence',(req,res)=>{
    const num_of_student=req.body.num_of_student
    const subject_id= req.body.subject_id
console.log(num_of_student, subject_id, "data")
   db.query("INSERT INTO presence (num_of_student,subject_id) VALUES (?,?)",
    [num_of_student,subject_id],
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

app.get("/subjects", async (req, res) => {
  let asdasd = [];
    try {
        asdasd =  await db.query("SELECT * FROM `subject`",
             (err,result)=>{
                 if(err == "null"){
                 console.log(err);
                }
                else{
                    res.status(200).json({
                        status: "succes",
                        data: {
                            result
                        },
                      });
                }
            }
            );

    } catch (err) {
      console.log(err);
    }
  });


app.get("/presence", async (req, res) => {
    let presence = [];
      try {
          let subjectIDs;
        await db.query("SELECT id FROM `subject`", (err,result)=>{
            subjectIDs = result
        })
         await db.query("SELECT * FROM `presence`, subject WHERE presence.subject_id = subject.id",
               (err,result)=>{
                   if(err == "null"){
                  }
                  else{

                const querrydata = Object.values(JSON.parse(JSON.stringify(result)));
                    subjectIDs.map(subjectID =>{
                        presence.push(querrydata.filter(data =>data.subject_id === subjectID.id))
                    })
    
                    res.status(200).json({
                        status: "succes",
                        data: {
                            presence
                        },
                      });
                  }
                  
              }
              );

             
      } catch (err) {
        console.log(err);
      }
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