const express = require('express') ;
import {pool} from '../db.js' ;
const app = express() ;
app.use(express.json()) ;
app.post("/task" , async(req,res) =>{
    const {title ,description ,assignee ,status} = req.body 
    if(!title || !description || !assignee  ||!status) {
        res.json({
            message:"please provide all the informaation " ,
            status : 401 
        })
    } 
    const query = `INSERT INTO todos (title , description , assignee , status)
    VALUES($1 ,$2,$3,$4)
    RETURINING* ; `
    const values = [ title , description , assignee , status] ;
    try{
    const result =  await pool.query(query , values) ;
    res.status(201).json( 
        result,rows[0] 
        
    )
}

    
    

    
})