"use client"
import Link from "next/link"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect,useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { auth } from "./FireBase"

function Dashboard(props){  //here to take inspiration from code, doesn't work
    const [user,setUser] = useState("") //user variable
    useEffect(()=>{//Listen to changes on user: if the user changes, set it to be the current user
        const unsub = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return () => unsub
    },[])//[] mean to only do this once there's a change, saves resources
    
    const handleSignOut = async()=>{ //close firebase connection
        await signOut(auth)
        alert ("user signed out!")
        // move to login page with link
    }
    return(
        <div>
            {user ? (
                <div>
                    <h2> welcome {user.email} </h2>    
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
            <div>
                <h2> Sign in or Sign up</h2>
                <SignIn/>
                <SignUp/>
            </div>
            )}        
        </div>
    )
}
export default Dashboard