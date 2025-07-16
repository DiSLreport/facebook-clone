"use client"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./FireBase"
import { useState } from "react"

const SignUp = () => {//const and function are similar, const will work better with other consts
    //for simple components: doesn't matter which we choose
    //hooks, use state, use effect, useReference: better use const
    const [email,setEmail] = useState("")//"" means default empty
    const [password,setPassword] = useState("")
    const handleSignUp = async (e) => {//async to not get stuck while waiting
        e.preventDefault()//preventDefault means: don't go to server [to not reset inputs]
        try{
            await createUserWithEmailAndPassword(auth,email,password)
            alert ("user registered successfuly") //message to user
        }
        catch (err){
            console.log("insidesignUp")
            console.log(err) //print the error to log
        }
    }
    return(
    <div>
        <h2> sign up </h2>
        <form onSubmit={handleSignUp}>
            <input
            type = "email"
            placeholder="enter your email" //placeholder is like hint
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/> 
            {/* e is an event, has a lot inside it, target.value is what we care about */}
            <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    )
}
export default SignUp //lets the rest of the components use this, basically public