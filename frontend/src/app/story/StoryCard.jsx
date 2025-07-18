"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import AvatarFacebook from "../components/AvatarFacebook";
import useUserFirstLetter from "../components/UseUserFirstLetter";

const StoryCard = ({ isAddStory, story }) => {
  const userFirstLetter = useUserFirstLetter(); // Get first letter from DB

  const handleStoryClick = () => {
    // Add logic for story click
    // Dont think we have time for this
  };

  return (
    <Card
      className="w-40 h-60 relative overflow-hidden group cursor-pointer rounded-xl"
      onClick={isAddStory ? undefined : handleStoryClick}
    >
      <CardContent className="p-0 h-full">
        {isAddStory ? (
          <div className="w-full h-full flex flex-col">
            <div className="h-3/4 w-full relative border-b">
              <AvatarFacebook avatarClassNameSpesific="w-full h-full" />
              <p className="w-full h-full flex justify-center items-center text-4xl">
                {userFirstLetter}
              </p>
            </div>
            <div className="h-1/4 w-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
              <Button
                className="p-0 h-8 rounded-full bg-blue-500 hover:bg-blue-600"
                variant="ghost"
                size="sm"
              >
                <Plus className="h-5 w-5 text-white" />
              </Button>
              <p className="text-xs font-semibold mt-1">{userFirstLetter}</p>
            </div>
            <input type="file" accept="image/*,video/*" className="hidden" />
          </div>
        ) : (
          <>
            {story?.mediaType === "image" ? (
              <img
                src={story?.mediaUrl}
                alt={story.user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={story?.mediaUrl}
                alt={story.user.username}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-2 left-2 ring-2 rounded-full">
              <Avatar>{/*this is another user lettername*/}
                <AvatarImage />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute bottom-2 left-2 px-1 bg-black bg-opacity-60 rounded">
              <p className="text-white text-xs font-semibold truncate">
                {story?.user?.name || "Generic Name"}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StoryCard;
