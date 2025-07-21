"use client"
import HomePage from "./Homepage/page";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./components/FireBase"
import Page from "./user-login/page";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import User, { userRef } from "./components/User";

export default function Home() {
    const userRef = useRef();
    const router = useRouter()
      const handleNavigation = (path, item) => {
        useEffect(() => { //creating a timer with useeffect to avoid routing before loading the component
        const timer = setTimeout(() => {
            router.push(path)
        }, 100); 
        return () => clearTimeout(timer); //we need to clean the timer, automatically called when routing
      }, []);
      }

  const [user,setUser] = useState("") //user variable
      useEffect(()=>{//Listen to changes on user: if the user changes, set it to be the current user
        const unsub = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            userRef.current=(currentUser)
        })
        return () => unsub
    },[])//[] mean to only do this once there's a change, saves resources
    
    const handleSignOut = async()=>{ //close firebase connection
        await signOut(auth)
        alert ("user signed out!")
        // move to login page with link
    }

  return (
        <div>
            <User></User>
            {console.log(userRef.current)}
            {userRef.current ? (
                <div>
                    {console.log(`user is connected ${userRef.current}`)}
                    {/* <h1>hello</h1> */}
                    {handleNavigation("/Homepage")}
                    {/* <HomePage></HomePage> */}
                </div>
            ) : (
            <div>
                {console.log(`user is not connected ${userRef.current}`)}
                {/* <h2> Sign in or Sign up</h2> */}
                {/* <{<SignIn/>
                <SignUp/>}> */}
                {handleNavigation("/user-login")}
                {/* <Page></Page> */}
            </div>
            )}      
        </div>
    )
}
