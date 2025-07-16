"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Camera, PenLine, Save, Upload, X, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: ""
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenderChange = (value) => {
    setSignupData({
      ...signupData,
      gender: value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    // Add your login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Signup data:", signupData);
    // Add your signup logic here
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
            <CardTitle className="text-2xl font-bold text-center">
              <span>Effibook</span>
            </CardTitle>
            <CardDescription>
              connect with effis around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">
                        Email
                      </Label>
                      <Input 
                        id="loginEmail" 
                        name="email" 
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword">
                        Password
                      </Label>
                      <div className="relative">
                        <Input 
                          id="loginPassword" 
                          name="password" 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignupSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name
                        </Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          placeholder="First name"
                          value={signupData.firstName}
                          onChange={handleSignupChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name
                        </Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          placeholder="Last name"
                          value={signupData.lastName}
                          onChange={handleSignupChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">
                        Email
                      </Label>
                      <Input 
                        id="signupEmail" 
                        name="email" 
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">
                        Date of Birth
                      </Label>
                      <Input 
                        id="dateOfBirth" 
                        name="dateOfBirth" 
                        type="date"
                        value={signupData.dateOfBirth}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">
                        Gender
                      </Label>
                      <Select onValueChange={handleGenderChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">
                        Password
                      </Label>
                      <div className="relative">
                        <Input 
                          id="signupPassword" 
                          name="password" 
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={signupData.password}
                          onChange={handleSignupChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword" 
                          name="confirmPassword" 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={handleSignupChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default page;