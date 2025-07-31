"use client"
import HomePage from "./Homepage/page";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./components/FireBase"
import Page from "./user-login/page";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
// import User, { userRef } from "./components/User";
import useUserStore from "@/store/UserStore";
import { useStore } from "zustand";

export default function Home() {
    // const userId = useUserStore.getState().userId
    const userId = useStore(useUserStore, (state)=>state.userId)
    const [path,setPath] = useState("")
    // const position = useStore(positionStore, (state) => state.position)

    const router = useRouter()

    useEffect(()=>{
    if(userId)
        setPath("/Homepage")
    else
    setPath("/user-login")
    },[]);
    
   
      const useHandleNavigation = (path) => { //got error when it was handleNavigation
        useEffect(() => { //creating a timer with useeffect to avoid routing before loading the component
        const timer = setTimeout(() => {
            router.push(path)
        }, 100); 
        return () => clearTimeout(timer); //we need to clean the timer, automatically called when routing
      },[path]);
      }

//   const [user,setUser] = useState("") //user variable
//       useEffect(()=>{//Listen to changes on user: if the user changes, set it to be the current user
//         const unsub = onAuthStateChanged(auth,(currentUser)=>{
//             setUser(currentUser)
//             // userRef.current=(currentUser)
//         })
//         return () => unsub
//     },[])//[] mean to only do this once there's a change, saves resources
    
//     const handleSignOut = async()=>{ //close firebase connection
//         await signOut(auth)
//         alert ("user signed out!")
//         // move to login page with link
//     }

  return (
        <div>
            {/* <User></User> */}
            {/* {console.log(userRef.current)} */}
           
                {/* <div> */}
                    {/* {console.log(`user is connected ${userId}`)} */}
                    {/* <h1>hello</h1> */}
            {useHandleNavigation(path)}
                    {/* <HomePage></HomePage> */}
                {/* </div> */}
        </div>
    )
}
