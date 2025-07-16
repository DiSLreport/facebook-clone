"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

const ProfileHeader = () => {
  const [isEditProfileModel, setIsEditProfileModel] = useState(false);
  const [isEditCoverModel, setIsEditCoverModel] = useState(false);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);

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
          <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700">
            <AvatarImage />
            <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold">Generic name</h1>
            <p className="text-gray-400 font-semibold">3 friends</p>
          </div>
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
              <form className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 mb-4">
                    <AvatarImage />
                    <AvatarFallback className="dark:bg-gray-400">
                      D
                    </AvatarFallback>
                  </Avatar>
                  <input type="file" accept="image/*" className="hidden" id="profile-pic" />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change profile picture
                  </Button>
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of birth</Label>
                  <Input id="dateOfBirth" type="date" />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
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