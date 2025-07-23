import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import VideoCard from "./VideoCard";

const VideoPage = () => {
    const videoPosts = [{
        _id:1,
        mediaUrl: "",
        mediaType: "video",
        comments: [{
            user:{
                username: "Generic name",
                text:"message contnet",               
            }
        }]
    }]
    return (
        <div className="mt-12 min-h-screen">
            <LeftSideBar />
            <main className="ml-0 md:ml-64 p-6">

                <Button variant="ghost" className="mb-4">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to feed
                </Button>
                <div className="max-w-3xl mx-auto">
                    {videoPosts.map((post) => (
                        <VideoCard
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}
export default VideoPage