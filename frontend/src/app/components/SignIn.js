"use client"
import Link from "next/link"
import { signInWithEmailAndPassword} from "firebase/auth"
import { useState } from "react"
import { auth } from './FireBase'

const SignIn = () => {  //here to take inspiration from code, doesn't work
    
    //const and function are similar, const will work better with other consts
    //for simple components: doesn't matter which we choose
    //hooks, use state, use effect, useReference: better use const
    const [email,setEmail] = useState("")//"" means default empty
    const [password,setPassword] = useState("")
    const handleSignIn = async (e) => {//async to not get stuck while waiting
        e.preventDefault()//preventDefault means: don't go to server [to not reset inputs]
        try{
            await signInWithEmailAndPassword(auth,email,password)
            alert ("user logged in successfuly") //message to user
        }
        catch (err){
            console.log(err) //print the error to log
        }
    }
    return(
    <div>
        <h2> sign in </h2>
        <form onSubmit={handleSignIn}>
            <Link href="/">Home</Link>
            <input
            type = "email"
            placeholder="enter your email" //placeholder is like hint
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>
            {/* //e is an event, has a lot inside it, target.value is what we care about */}
            <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Sign In</button>
        </form>
    </div>
    )
}
export default SignIn //lets the rest of the components use this, basically public