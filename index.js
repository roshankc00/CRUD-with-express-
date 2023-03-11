const { json } = require('body-parser')
const express=require('express')
const fs=require('fs')
const users=require('./MOCK_DATA.json')
const app=express()
const port =3000

// middleware plugins --> here the middleware only parses urlencoded bodies and only looks at the request where the content type header matches the option 
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    
    fs.appendFile('logged.txt',`${Date.now()}:${req.method}:${req.path}: ${req.ip}\n`,(err,res)=>{

        next()
    })
})





app.get('/api/users',(req,res)=>{
    // setting up the header  f
    res.setHeader("x-myName","Roshan karki ") //always the good practice to use x-headers for the custom headers 
    return res.json(users)
})
app.get('/users',(req,res)=>{
  const html=`
  <ul>
  ${users.map(user=>`<li>${user.first_name} </li>`).join('')}
  </ul>
  `;
  res.send(html)
  console.log(html)
})

app.get('/users/:id',(req,res)=>{
    const id=Number(req.params.id)
    const user=users.find(user=>user.id===id)
    if(!user) return res.status(404).json({error:"user not found"})
        return res.json(user)
        console.log("roshan")
    
})
app.post('/api/users',(req,res)=>{
    // create new user 
    const body=req.body
    users.push({...body,id:users.length+1})
    
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{

        return res.status(201).json({status:"sucess",id:users.length+1});
    })

});
app.patch('/api/users/:id',(req,res)=>{

    res.json({status:"pending"})
    // update the  user 
});
app.delete('/api/users/:id',(req,res)=>{
    res.json({status:"pending"})
    // delete  user 
});

// dynamic path parameter 

app.listen(port,()=>{
    console.log("iam listhening ")
})