"use client"
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginComponent = ({email,password}) => { //attempt to create a login component, didn't finish. (not in use)
    const router = useRouter()

    const handleNavigation = (path, item) => {
      router.push(path)
    }

const HandleLogin = async (e) => {
    e.preventDefault();
    try{
            // console.log(`email is: ${loginData.email}, password is: ${loginData.password}`)
            await signInWithEmailAndPassword(auth,email,password)
            alert ("user logged in successfuly") //message to user
            
            handleNavigation("/Homepage")
        }
        catch (err){
            console.log(err) //print the error to log
        }
    console.log("Login Data:", loginData);
  };

return(
<div>
{HandleLogin}
</div>
)}
export default LoginComponent