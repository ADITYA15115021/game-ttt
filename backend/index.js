

import express from "express";
import { emailSchema,passwordSchema } from "./zodSchema.js";
import bcrypt from "bcrypt";
import {jwt} from "jsonwebtoken";

const app = express();
const port = 3000;
app.listen(port,()=>{console.log(`server running on port ${port}`)} );

app.use(express.json());

function authenticateInput(req,res,next){
   
   const body = req.body;
   
   const email_result = emailSchema.safeParse(body.email);
   if( !email_result.success ){
      return res.json({msg : "invalid email "})
   }
   
   const password_result = passwordSchema.safeParse(body.password);
   if( !password_result.success ){
      let arr = [];//either we can return all the error,or the very first error msg
      password_result.error.errors.forEach( e => {
         arr.push( e.message );
      } ) 
      return res.json({ msg : arr });
   }

   next();

}

app.get("/health",(req,res)=>{
    res.send("health check performed succussfully!");
})

app.post( "/signup", authenticateInput,async (req,res)=>{
       
      //1.now,either we make a db request to check if a user with provided email exist or not 
      //and then create a hash password or 
      //first create a hash password and then handle the db query
      //what is the  tradeoff ? a network request or computational cost 
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password,5);
      
      //making the db query and returning a jwt token;


      return res.json( { msg : "user entered" , hash : hashedPassword} );
    
} )