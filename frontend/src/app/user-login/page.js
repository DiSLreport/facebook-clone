"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/FireBase";

const UserLoginPage = ()=> {
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            alert("this is a test")
            console.log("hello")
            console.log(`email is: ${loginData.email}, password is: ${loginData.password}`)
            await signInWithEmailAndPassword(auth,loginData.email,loginData.password)
            alert ("user logged in successfuly") //message to user
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