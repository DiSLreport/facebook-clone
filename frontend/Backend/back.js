//server /index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyparser.json);


mongoose.connect('mongodb+srv://avraham91:clU22iZVqpWsDvfZ@cluster-android-2.1wuphwr.mongodb.net/?retryWrites=true&w=majority&appName=cluster-android-2');


const userSchema = new mongoose.Schema({
    firstName:String,
   lastName:String,
   email:{String, required:true, unique:true}, //email needs to be unique
   dateOfBirth:Date,
   gender:String
});

const User = mongoose.model('User',userSchema);

app.post('/api/users', async (req,res)=>{ //req: data from client res: what we send back
    const {command,data} = req.body;
    try{
        switch(command){
            case 'insert':
                const newUser = ({name:data.name, email:data.email})//input validation should be here...
                await newUser.save() //save to database
                return res.json({message:'user insert successful',user:newUser})
            case 'select':
                const users = await user.find({})
                return res.json({message: users='get your users', users})
            case 'update':
                const updatedUser = await User.findByIdAndUpdate( //retrieve info about user
                    data.userId,
                    { email:data.newEmail },
                    { new:true }
                    );
            if (!updatedUser){
                return res.status(404).json({ message:'user not found' })
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