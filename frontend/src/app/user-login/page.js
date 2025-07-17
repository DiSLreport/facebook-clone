"use client";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/FireBase";
import { useRouter } from "next/navigation";

const UserLoginPage = ()=> {
  const router = useRouter()
    const handleNavigation = (path, item) => {
      router.push(path)
    }
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false); //toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //toggle password visibility
  const [users,setUsers] = useState([])
  const [userId,setUserId] = useState('')
  const [message, setMessage] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(()=>{
    fetchUsers();
  },[]);

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
    console.log(`this is the command ${command}, this is the data${data}`)
        try {
          console.log("inside handle command")
            const response = await axios.post('http://localhost:5000/api/users', { //problem might be here
                command,
                data: {
                    signUpName:signupData.firstName,//+signupData.lastName, //check if this concats
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

    // const handleEdit = (user) => {
    //     setUserId(user._id);
    //     setName(user.name);
    //     setEmail(user.email);
    //     setNewEmail('');
    //     setMessage(`Editing user: ${user.name}`);
    // };

    // const confirmDelete = (id) => {
    //     setConfirmDeleteId(id);
    // };

    // const performDelete = () => {
    //     if (confirmDeleteId) {
    //         handleCommand('delete', { userId: confirmDeleteId });
    //         setConfirmDeleteId(null);
    //     }
    // };

    // const cancelDelete = () => {
    //     setConfirmDeleteId(null);
    // };
    


  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value) => {
    setSignupData({ ...signupData, gender: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
            // console.log(`email is: ${loginData.email}, password is: ${loginData.password}`)
            await signInWithEmailAndPassword(auth,loginData.email,loginData.password)
            alert ("user logged in successfuly") //message to user
            
            handleNavigation("/Homepage")
        }
        catch (err){
            console.log(err) //print the error to log
        }
    console.log("Login Data:", loginData);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    else try{
            await createUserWithEmailAndPassword(auth,signupData.email, signupData.password)
            alert ("user registered successfuly") //message to user
            handleCommand('insert')
            console.log("checking if handle command works- after handle command")
        }
        catch (err){
            console.log(err) //print the error to log
        }
    console.log("Signup Data:", signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md dark:text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Effibook</CardTitle>
            <CardDescription className="text-center">
              connect with effis around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full" onValueChange={setTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm
                  data={loginData}
                  onChange={handleLoginChange}
                  onSubmit={handleLoginSubmit}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm
                  data={signupData}
                  onChange={handleSignupChange}
                  onGenderChange={handleGenderChange}
                  onSubmit={handleSignupSubmit}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  toggleShowConfirmPassword={toggleShowConfirmPassword}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default UserLoginPage