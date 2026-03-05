import express from "express"; 

import cors from "cors" 
import validator from "validator" 
import jwt from "jsonwebtoken" ;
import bcrypt from "bcrypt" ;
const app = express() ; 

app.use(express.json()) ;


const PORT = 3000 ;
// logger 
app.use(cors({
    origin :"http://localhost:3000"
}))
// middle ware for the validaaotr 

const users = [{
    id : 1 ,
    email : "rujal.ladhe@gmail.com" ,
    password : bcrypt.hashSync("rujal",10) 

}]









//


function valid(req,res,next) {
 const {email,password} = req.body ;
 if(!email || !validator.isEmail(email)) {
    res.send({
        message : "give proper email to proceed" ,
        success : false ,
        status: 300 

    })
}
    if(!password || !password.length <8) {
        res.send({
            message:"lavde barabr password dal",
            success : false ,
            status : 301 
        })
    }
    next() 
 
}
function errorhandler(err,req,res,next){
    console.log(err.sucess , err.message ) 

    res.status(500).json({
        message : err.message ,
        success : false 
    })
}
// post req 
app.post("/gauri" , valid ,(req,res)=>{
    const{password , email} = req.body ;
    res.status(300).json({
        message : "gauri end point hit " ,
        success : true ,
        password ,
        email
    })

})
function auth(req,res,next){
    const auth = req.headers.authorization 
    if(!auth) {
        res.status(401).json({
            message : " not authorized to acess " ,
            success : false 
        })
    }
    next() 
}
function logger(req,res,next) {
    console.log(`${req.url},${res.Message},${req.method}`)
    next() ;
}
app.use(logger) ;
app.get("/rujal", auth,(req,res)=>{
    try{
    res.json({
        Message: "hey rujal" ,
        success : " true" 
    })}
    catch(err){
        res.status(500).json({
            message : " nikal lavde " ,
            success : false 
        })
    }

})



app.get("/riya",(req,res)=>{
  throw new Error({
    message: " nikal lavdi" ,
    success : false 
  })

})
app.post("/login",async(req,res)=>{
    const{email, password} = req.body ;
     const user = users.find(u => u.email === email);
    const ispassword = await bcrypt.compare(password, user.password) ;
     
    if(!ispassword) {
        res.json({
            message:"password is incorect " ,

        })
    }
    const token = jwt.sign({
        id:user.id,password:user.password ,email:user.email
    },
    "rujal" ,
    {expiresIn:"1h"}
)
res.json({
    token ,

})



})


app.use(errorhandler);

app.listen(PORT , ()=>{
    console.log(`server running on ${PORT}`)
})