import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import React from "react";

const StoryCard = ({ isAddStory, story }) => {
    const handleStoryClick = () => { };
    return (
        <>
            <Card
                className="w-40 h-60 relative overflow-hidden group cursor-pointer rounded-xl"
                onClick={isAddStory ? undefined : handleStoryClick}>

                <CardContent className="p-0 h-full">
                    {isAddStory ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="h-3/4 w-full relative border-b">
                                <Avatar className="w-full h-full">
                                    <AvatarImage />
                                    <p className="w-full h-full flex justify-center items-center text-4xl">D</p>
                                </Avatar>
                            </div>
                            <div className="h-1/4 w-full bg-white dark:bg-gray-800 flex flex-col item-center justify-center">
                                <Button className="p-0 h-8 rounded-full bg-blue-500 hover:bg-blue-600" variant="ghost" size="sm">
                                    <Plus className="h-5 w-5 text-white" />
                                </Button>
                                <p className="text-xs font-semibold mt-1">Create Story</p>
                            </div>
                            <input type="file" accept="image/*,video/*" className="hidden">
                            </input>
                        </div>
                    ) : (
                        <>
                            {story?.mediaType === "image" ? (
                                <img src={story?.mediaUrl} alt={story.user.username} className="w-full h-full object-cover" />
                            ) : (
                                <video src={story?.mediaUrl} alt={story.user.username} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute top-2 left-2 ring-2 blur-ring-500 rounded-full">
                                <Avatar>
                                    <AvatarImage />
                                    <AvatarFallback>D</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="absolute top-2 left-2 ring-2">
                                <p className="text-white text-xs font-semibold turncate">Generic Name</p>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
};
export default StoryCard