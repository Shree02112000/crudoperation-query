const mysql = require('mysql');
const  express= require("express");
var app=express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rs02112000',
    database:'register',
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
if(!err)
console.log('connection established successfully');
else
console.log('connection failed!'+JSON.stringify(err,undefined,2));
});
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//getall
app.get('/register',(req,res)=>{
    mysqlConnection.query('SELECT * FROM register.register',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})

//post
app.post('/newuser',(req,res)=>{
   console.log(req.body,'createdata');

   let id =req.body.id;
   let name = req.body.name;
   let email = req.body.email;
   let phone=req.body.phone;
   let password=req.body.password;

   let user =`insert into register(id,name,email,phone,password)
   values('${id}','${name}','${email}','${phone}','${password}')`;

   mysqlConnection.query (user,(err,results)=>{
    if(err){
        console.log(err);}
    console.log(results,"results")
    res.send({
        message:'data created',
    })
   })
});

//update
app.put('/update/:id',(req,res)=>{
  console.log(req.body,'updatedata');
  let id = req.params.id;
  let name = req.body.name;
  let email= req.body.email;  
  let phone= req.body.phone;
  let password=req.body.password;

  let updateuser=`update  register set  name='${name}', email='${email}',phone='${phone}', password='${password}'where id = '${Id}';`

   mysqlConnection.query(updateuser,(err)=>{
    if(err){
    console.log(err);}
    res.send({
        message:'data updated'
    });
   });
});

//delete
app.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;
    let deleteuser = `DELETE FROM register WHERE id =${id}`
    mysqlConnection.query(deleteuser,(err)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:'user deleted'
        });
    });
});

//get
app.get('/getuser/:id',(req,res)=>{
    let id = req.params.id;
    let getuser= `SELECT * FROM register WHERE id=${id}`
    mysqlConnection.query(getuser,(err,rows)=>{
        if(err){
            console.log(err);
        }
        res.send(rows);
    })
})

