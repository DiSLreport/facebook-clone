import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import LoginForm from "../user-login/LoginForm";
// import SignupForm from "./SignupForm";
// import { signInWithEmailAndPassword} from "firebase/auth"
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/FireBase";
import { useRouter } from "next/navigation";


// export const userRef = { current: null };
    // if(userRef){
    //     export const userRef
    // }
    // export const modifyUserRef = (modifiedUserRef) =>{
    //     userRef.current = modifiedUserRef;
    // }


function User(){

    // const [tab, setTab] = useState("login");
    //   const [showPassword, setShowPassword] = useState(false); //toggle password visibility
    //   const [showConfirmPassword, setShowConfirmPassword] = useState(false); //toggle password visibility
//    const userComponentRef = useRef(null);
  const [users,setUsers] = useState([])
  const [userId,setUserId] = useState('')
    //   const [message, setMessage] = useState('');
    //   const [newEmail, setNewEmail] = useState('');
  
//     useEffect(()=>{
//     const userComponentRef= useRef(null);
//   },[]);
  
//   const modifyUserComponentRef = (modifiedUserComponentRef)=>{
//     userComponentRef.current = modifiedUserComponentRef
//   }
  
//   useEffect(()=>{
//       fetchUsers();
//     },[]);
  
    
    const fetchUsers = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                command: 'select',
                data: {}
            });
            setUsers(response.data.users || []);
        } catch (error) {
            console.error(error);
            setMessage('Error fetching users: ' + (error.response?.data?.message || error.message));
        }
    };

    
const handleCommand = async (command, data = {}) => {
    // console.log(`this is the command ${command}, this is the data${data}`)
        try {
        //   console.log("inside handle command")
            const response = await axios.post('http://localhost:5000/api/users', {
                command,
                data: {
                    signUpName:signupData.firstName+ " " +signupData.lastName, 
                    signUpEmail:signupData.email,
                    signUpPassword:signupData.password,
                    signUpDateOfBirth:signupData.dateOfBirth,
                    signUpGender:signupData.gender,
                    logInEmail:loginData.email,
                    logInPassword:loginData.password,
                    userId,
                    newEmail,
                    ...data
                }
            });

            setMessage(response.data.message || 'Operation completed successfully.');
            fetchUsers();
        } catch (error) {
            console.error(error);
            setMessage('Error: ' + (error.response?.data?.message || error.message));
        }
    };

const handleEdit = (user) => {
        setUserId(user._id);
        setName(user.name);
        setEmail(user.email);
        setNewEmail('');
        setMessage(`Editing user: ${user.name}`);
    };

    const confirmDelete = (id) => {
        setConfirmDeleteId(id);
    };

    const performDelete = () => {
        if (confirmDeleteId) {
            handleCommand('delete', { userId: confirmDeleteId });
            setConfirmDeleteId(null);
        }
    };
     
    const cancelDelete = () => {
        setConfirmDeleteId(null);
    };
return(
    <div>
        
    </div>
)
}

    export default User;