"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {Eye, EyeOff} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { Camera, PenLine, Save, Upload, X } from "lucide-react";
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
import AvatarFacebook from "@/components/ui/avatar-facebook";
import useUserStore from "@/store/UserStore";
import { useStore } from "zustand";
import { auth } from "../components/FireBase";
import { reauthenticateWithCredential, EmailAuthProvider, updateEmail,updatePassword } from "firebase/auth";
import axios from "axios";

const ProfileHeader = () => {
  const [message,setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false); //toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)//toggle password visibility for current password
  const [isEditProfileModel, setIsEditProfileModel] = useState(false);
  const [isEditCoverModel, setIsEditCoverModel] = useState(false);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const userId = useStore(useUserStore, (state)=>state.userId)
  const setUserData = useUserStore((state) => state.setUserData)
  const setStoreUsers = useUserStore((state) => state.setUsersArray)
  const [imageUrl,setImageUrl] = useState("")
 const [editUserData, setEditUserData] = useState({
     firstName: "",
     lastName: "",
     currentEmail: "",
     newEmail:"",
     currentPassword: "",
     newPassword: "",
     confirmNewPassword: "",
     dateOfBirth: "",
     gender: "",
     newUserImageUrl:"",
   });

   const handleEditSubmit = async (e) =>{
    console.log(`Edit data is: ${JSON.stringify(editUserData)}`)
    e.preventDefault();
    if (editUserData.newPassword !== editUserData.confirmNewPassword){
      alert ("Passwords do not match");
    return;
  }
    else try{
      const user = auth.currentUser; //if user isn't connected, we should remove this line
      const credential = EmailAuthProvider.credential(
    editUserData.currentEmail,
    editUserData.currentPassword)
      await reauthenticateWithCredential(user, credential).then(()=>{
      updateEmail(user, editUserData.newEmail).then(()=>{
        console.log(`user email updated successfully`)
      }).catch((error)=>{
        console.log(`error occurred while trying to update email: ${error}`)
        return
      });
      }).catch((error)=>{
        console.error(`error occured while trying to reauthenticate user for email reauth: ${error}`)
        return
      });
      const secondCredential = EmailAuthProvider.credential(
      editUserData.newEmail,
      editUserData.currentPassword)
      await reauthenticateWithCredential(user, credential).then(()=>{
      updatePassword(user, editUserData.newPassword).then(()=>{
        console.log(`password updated successfully`)
      }).catch((error)=>{
        console.error(`error occurded while trying to update password: ${error}`)
        return
      });}).catch((error)=>{
        console.error(`error occured while trying to reauthenticate user for password reauth: ${error}`)
        return
      });

      // }).catch((error)=>{
      //   console.error(`error occured while trying to reauthenticate user: ${error}`)
      //   return
      // });

      await handleCommand('update');
      console.log("fill with updating logic")
  }    catch (err){
        console.log(err)//print error to log
  }
    };

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

const handleCommand = async(command,data = {}) =>{ //probably could copy or import from userloginpage.
      console.log(`this is the command ${command}, this is the data${data}`)
      try{
        console.log("inside edit handle command")
          const response = await axios.post('http://localhost:5000/api/users', { 
                command,
                data: {
                    signUpName:editUserData.firstName+ " " +editUserData.lastName, 
                    signUpEmail:editUserData.newEmail.toLowerCase(),
                    //signUpPassword:signupData.password,
                    signUpDateOfBirth:editUserData.dateOfBirth,
                    signUpGender:editUserData.gender,
                    userMediaUrl:editUserData.newUserImageUrl,
                    userMediaType: "image",
                    userId:userId,
                    ...data
                }
            });
            setMessage(response.data.message || 'Operation completed successfully.');
            console.log(JSON.stringify(message))
            console.log(`response user id is ${response.data.user._id}`);
            console.log(`response user is ${JSON.stringify(response.data.user)}`);
            setUserData(response.data.user._id, response.data.user)
            fetchUsers();
    } catch(error){
      console.error(error);
      setMessage('Error:' + (error.response?.data?.message || error.message));
    }
  }

    const handleEditChange = (e) =>{
      setEditUserData({...editUserData, [e.target.name]: e.target.value})
    }

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);
  const toggleShowCurrentPassword = () => setShowCurrentPassword(prev => !prev);

    const handleGenderChange = (value) => {
    setEditUserData({ ...editUserData, gender: value });
  };

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <div className="relative h-64 md:h-80 bg-gray-300 overflow-hidden">
        <img
          loading="lazy"
          src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <Button
          className="absolute bottom-4 right-4 flex items-center"
          variant="secondary"
          size="sm"
          onClick={() => setIsEditCoverModel(true)}
        >
          <Camera className="mr-0 md:mr-2 h-4 w-4" />
          <span className="hidden md:block">Edit cover photo</span>
        </Button>
      </div>
      {/*profile section*/}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5">

          <AvatarFacebook userId = {userId} avatarClassNameSpecific="w-32 h-32 border-4 border-white dark:border-gray-700" AvatarFallback="dark:bg-gray-400"/>          
          {/* <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700">
            <AvatarImage />
            <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold">Generic name</h1>
            <p className="text-gray-400 font-semibold">3 friends</p>
          </div> */}
          <Button
            className="mt-4 md:mt-0"
            onClick={() => setIsEditProfileModel(true)}
          >
            <PenLine className="w-4 h-4 mr-2" />
            Edit profile
          </Button>
        </div>
      </div>
      {/*edit profile */}
      <AnimatePresence>
        {isEditProfileModel && (
          <motion.div
            key="edit-profile-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Profile
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditProfileModel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form onSubmit={handleEditSubmit} className="flex flex-col space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <AvatarFacebook userId={userId} avatarClassNameSpecific="w-12 h-12 border-4 border-white dark:border-gray-700 mb-4" avatarFallbackclassNameSpecific="dark:bg-gray-400"/>
                  {/* <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 mb-4">
                    <AvatarImage />
                    <AvatarFallback className="dark:bg-gray-400">
                      D
                    </AvatarFallback> 
                  </Avatar>*/}
                  {/* <input type="file" accept="image/*" className="hidden" id="profile-pic" onChange ={handleCoverPhotoChange}/>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change profile picture
                  </Button> */}
                 

                </div>
                <div>
                 <Label htmlFor="newUserImageUrl">New Image Url</Label>
                 <Input
                 id="newUserImageUrl"
                 name="newUserImageUrl"
                 placeholder="Image Url"
                 value={editUserData.newUserImageUrl}
                 onChange={handleEditChange}
                 required/>
                </div>
                {/* <div>
                  
                  <Input id="username" />
                </div> */}
                <div>
                 <Label htmlFor="firstname">First Name</Label>
                 <Input
                 id="firstName"
                 name="firstName"
                 placeholder="First name"
                 value={editUserData.firstName}
                 onChange={handleEditChange}
                 required/>
                </div>
                <div>
                <Label htmlFor="lastname">Last Name</Label>
                 <Input
                 id="lastName"
                 name="lastName"
                 placeholder="Last name"
                 value={editUserData.lastName}
                 onChange={handleEditChange}
                 required/>
                </div>
                
                <div className="space-y-2">
                <Label htmlFor="currentEmail">Current Email</Label>
                <Input 
                id="currentEmail"
                name="currentEmail"
                type="email"
                placeholder="Enter your current email"
                value={editUserData.currentEmail}
                onChange={handleEditChange}
                required
                />
                </div>

                <div className="space-y-2">
                <Label htmlFor="newEmail">New Email</Label>
                <Input
                id="newEmail"
                name="newEmail"
                type="email"
                placeholder="Enter your updated email"
                value={editUserData.newEmail}
                onChange={handleEditChange}
                required
                />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                     id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={editUserData.dateOfBirth}
                    onChange={handleEditChange}
                    required
                    />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={handleGenderChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">male</SelectItem>
                      <SelectItem value="female">female</SelectItem>
                      <SelectItem value="other">rather not say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Insert your current password"
                  value={editUserData.currentPassword}
                  onChange={handleEditChange}
                  required
                />  
            <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={toggleShowCurrentPassword}
          >
            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>


                  <div className="space-y-2">
        <Label htmlFor="editNewPassword">New Password</Label>
        <div className="relative">
          <Input
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Choose a new password"
            value={editUserData.newPassword}
            onChange={handleEditChange}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>



                      <div className="space-y-2">
        <Label htmlFor="confirmNewPassword">Confirm new password</Label>
        <div className="relative">
          <Input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Choose a new password"
            value={editUserData.confirmNewPassword}
            onChange={handleEditChange}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>


                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-400 text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save changes
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*edit cover model */}
      <AnimatePresence>
        {isEditCoverModel && (
          <motion.div
            key="edit-cover-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Cover photo
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditCoverModel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  {coverPhotoPreview && (
                    <img
                      src={coverPhotoPreview}
                      alt="cover-photo"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id="cover-photo" 
                    onChange={handleCoverPhotoChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('cover-photo').click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change cover photo
                  </Button>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-400 text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save changes
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProfileHeader;