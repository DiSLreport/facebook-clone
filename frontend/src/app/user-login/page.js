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
import { User } from "lucide-react";
import useUserStore from "@/store/UserStore";
import Providers from "../components/providers";
// import { userRef,modifyUserRef } from "../components/User";

const UserLoginPage = ()=> {
  const [userId,setUserId] = useState("")
  // const { userId, userData,setUserId,setUserData } = useUserStore.getState(); 
  //const {userId, userData, setUserId, setUserData,clearUserId} = useUserStore()
  const setUserData = useUserStore((state) => state.setUserData)
  const setStoreUsers = useUserStore((state) => state.setUsersArray)
  

  const router = useRouter()
    const handleNavigation = (path, item) => {
      router.push(path)
    }
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false); //toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //toggle password visibility
  const [users,setUsers] = useState([])
  // const [userId,setUserId] = useState('')
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
            setStoreUsers(response.data.users || []);
        } catch (error) {
            console.error(error);
            setMessage('Error fetching users: ' + (error.response?.data?.message || error.message));
            console.log(JSON.stringify(message))
        }
    };

  const handleCommand = async (command, data = {}) => {
    console.log(`this is the command ${command}, this is the data${data}`)
        try {
          console.log("inside handle command")
            const response = await axios.post('http://localhost:5000/api/users', { 
                command,
                data: {
                    signUpName:signupData.firstName+ " " +signupData.lastName, 
                    signUpEmail:signupData.email.toLowerCase(),
                    // signUpPassword:signupData.password,
                    signUpDateOfBirth:signupData.dateOfBirth,
                    signUpGender:signupData.gender,
                    logInEmail:loginData.email.toLowerCase(),
                    // logInPassword:loginData.password,
                    userMediaUrl:"https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt5f18c2119ce26485/6668df65db90945e0caf9be6/beautiful-flowers-lotus.jpg?q=70&width=3840&auto=webp",
                    userMediaType: "image",
                    userId,
                    newEmail,
                    ...data
                }
            });

            setMessage(response.data.message || 'Operation completed successfully.');
            console.log(JSON.stringify(message))
            console.log(`response user id is ${response.data.user._id}`);
            console.log(`response user is ${JSON.stringify(response.data.user)}`);
            // setUserId(response.data.user._id)
            if(command === "insert")
              console.log(`insert command, response data user id is: ${response.data.user._id}, response data user information is: ${response.data.user}`)
            setUserData(response.data.user._id, response.data.user)
//             const useDogStore = create(() => ({ paw: true, snout: true, fur: true }))
// // Getting non-reactive fresh state
// const paw = useDogStore.getState().paw
// // Listening to all changes, fires synchronously on every change
// const unsub1 = useDogStore.subscribe(console.log)
// // Updating state, will trigger listeners
// useDogStore.setState({ paw: false })
// // Unsubscribe listeners
// unsub1()

// // You can of course use the hook as you always would
// function Component() {
//   const paw = useDogStore((state) => state.paw)
//   ...
            // console.log(`user id inside zustand (real) is ${useUserStore((state)=>state.UserId)}`)

            // console.log(`user id inside zustand is: ${JSON.stringify(useUserStore.getState(userId))} and user data inside zustand is: ${JSON.stringify(useUserStore.getState(userData))}}`)

            fetchUsers();
            // console.log(`user ref id is:${User.userRef.current}`);
            // User.modifyUserRef(response.data.user._id);
            // console.log(`user ref new id is:${User.userRef.current}`);

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
            //insert mongo stuff
            await handleCommand('selectByEmail')
            console.log("this is after handle command, before navigation")
            console.log(JSON.stringify(useUserStore.getState(userId)))
            // console.log(userRef)
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
            await createUserWithEmailAndPassword(auth,signupData.email, signupData.password) // new firebase user
            alert ("user registered successfuly") //message to user
            await handleCommand('insert') //new user data in mongo db
            handleNavigation("/Homepage")
        }
        catch (err){
            console.log(err) //print the error to log
        }
    console.log("Signup Data:", signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      {/* <User></User> */}
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