//server /index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyparser.json());


mongoose.connect('mongodb+srv://avraham91:clU22iZVqpWsDvfZ@cluster-android-2.1wuphwr.mongodb.net/?retryWrites=true&w=majority&appName=cluster-android-2') //better have ENV files to keep these secret...
.then(()=>console.log("connected to MongoDB"))
.catch(err=>console.error("MongoDB connection error:",err));

const postSchema = new mongoose.Schema({
    postText: String,
    creatorId:{type:String, required:[true, "creatorId required"]},
    imageUrl: String, 
},{timestamps: true});


const userSchema = new mongoose.Schema({
   name:String,
   email:{type:String, required:[true, "email required"], unique:true},//String,//{type:String, required:[true, "email required"], unique:true,}, //email needs to be unique, got errors when trying
//    password:{type:String, required:[true,"password required"]},//String,//password needs to be required, got errors when trying{type:String, required:[true,"password required"],},
   dateOfBirth:String,
   gender:String,
   userMediaUrl: String,
   userMediaType: String
   //add profile image url
},{timestamps: true});
console.log("schema is done");

const User = mongoose.model('User',userSchema);

app.post('/api/users', async (req,res)=>{ //req: data from client res: what we send back
    const {command,data} = req.body;
    try{
        switch(command){
            case 'insert':
                const newUser = new User({
                    name:data.signUpName, 
                    email:data.signUpEmail,
                    password:data.signUpPassword,
                    dateOfBirth:data.signUpDateOfBirth,
                    gender:data.signUpGender,
                    userMediaUrl:data.userMediaUrl,
                    userMediaType:data.userMediaType});//input validation should be here...
                await newUser.save(); //save to database
                return res.json({message:'user insert successful',user:newUser});
            case 'select':
                const users = await User.find({});
                return res.json({message: 'get your users', users});
            case 'selectById':
                const userById = await User.findById(data.userId);
                return res.json({message: 'get your user by id', user:userById});
            case 'selectByEmail':
                const userByEmail = await User.findOne({email: {$eq: data.logInEmail}});
                return res.json({message: 'get your user by email', user:userByEmail});
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

    const Post = mongoose.model('Post',postSchema);

app.post('/api/posts', async (req,res)=>{ //req: data from client res: what we send back
    const {command,data} = req.body;
    try{
        switch(command){
            case 'insert':
                const newPost = new Post({
                    postText:data.postContent, 
                    creatorId:data.userId,
                    mediaUrl:data.mediaUrl,
                    mediaType:data.mediaType,
                    comments:data.comments})
                    ;//input validation should be here...
                await newPost.save(); //save to database
                return res.json({message:'post insert successful',post:newPost});
            case 'select':
                const posts = await Post.find({});
                return res.json({message: 'get your posts', posts});
            case 'selectById':
                const postById = await Post.findById(data.postId);
                return res.json({message: 'get your post by id', post:postById});
            case 'selectByUserId':
                const postsByUserId = await Post.find({creatorId: {$eq: data.userId}});
                return res.json({message: 'get your posts by email', post:postsByUserId});
            case 'update':
                const updatedPost = await Post.findByIdAndUpdate( //retrieve info about user
                    data.postId,
                    { postText:data.newPostText },
                    { new:true }
                    );
            if (!updatedPost){
                return res.status(404).json({ message:'post not found' });
            }
            return res.json({ message:'post updated',post: updatedPost });
            
            case 'delete': 
            const deletedPost = await Post.findByIdAndDelete(data.postId);
            if(!deletedPost){
                return res.status(404).json({ message:'Post not found' });
            }
            return res.json({message: 'Post deleted'});
            
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