//server /index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyparser.json);


mongoose.connect('mongodb+srv://avraham91:clU22iZVqpWsDvfZ@cluster-android-2.1wuphwr.mongodb.net/?retryWrites=true&w=majority&appName=cluster-android-2');
console.log("connected to mongoose");

const userSchema = new mongoose.Schema({
   name:String,
   email:String,//{type:String, required:[true, "email required"], unique:true,}, //email needs to be unique, got errors when trying
   password:String,//password needs to be required, got errors when trying{type:String, required:[true,"password required"],},
   dateOfBirth:String,
   gender:String
});
console.log("schema is done");

const User = mongoose.model('User',userSchema);

app.post('/api/users', async (req,res)=>{ //req: data from client res: what we send back
    const {command,data} = req.body;
    try{
        switch(command){
            case 'insert':
                const newUser = ({name:data.signUpName, email:data.signUpEmail,password:data.signUpPassword,dateOfBirth:data.signUpDateOfBirth,gender:data.signUpGender});//input validation should be here...
                console.log(newUser);
                await newUser.save(); //save to database
                return res.json({message:'user insert successful',user:newUser});
            case 'select':
                const users = await User.find({});
                return res.json({message: users='get your users', users});
            case 'update':
                const updatedUser = await User.findByIdAndUpdate( //retrieve info about user
                    data.userId,
                    { email:data.newEmail },
                    { new:true }
                    );
            if (!updatedUser){
                return res.status(404).json({ message:'user not found' });
            }
            return res.json({ message:'user updated',user: updatedUser });
            
            case 'delete': 
            const deletedUser = await User.findByIdAndDelete(data.userId);
            if(!deletedUser){
                return res.status(404).json({ message:'User not found' });
            }
            return res.json({message: 'User deleted'});
            
            default:
                return res.status(400).json({ message:'Unknown command' });
           }
        }
        catch(error){
            console.error(error);
            res.status(500).json({ message:'Server error', error: error.message });
        }
    });

    const PORT = 5000;
    app.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`);
    });