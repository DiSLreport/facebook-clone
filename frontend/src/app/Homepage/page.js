"use client"

import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar"
import RightSideBar from "../components/RightSideBar"
import StorySection from "../story/StorySection"
import NewPostForm from "../components/posts/NewPostForm"
import PostCard from "../components/posts/PostCard"
import useUserStore from "@/store/UserStore";

const HomePage = () => {
    //const user = useUserStore.getState().userId
    console.log(JSON.stringify(useUserStore.getState().userId))

    const [isPostFormOpen, setIsPostFormOpen] = useState(false)
    const post = [{
        _id: 1,
        content: "Hello Effi (message from Homepage->page)",
        mediaUrl: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt134818d279038650/6668df6434f6fb5cd48aac34/beautiful-flowers-rose.jpeg?q=70&width=3840&auto=webp",
        mediaType: "image",
        comments: [{
            user: {
                username: "Generic name",
                text: "message content",
            },
        }]
    },];
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">

            <main className="flex flex-1 pt-16">
                <LeftSideBar />
                <div className="flex-1 px-4 py-6 md:ml-64 lg:max-w-xl xl:max-w-3xl mx-auto">
                    <div className="lg:ml-2 xl:ml-28">
                        <StorySection />
                        <NewPostForm
                            isPostFormOpen={isPostFormOpen}
                            setIsPostFormOpen={setIsPostFormOpen}
                        />
                        <div className="mt-6 space-y-6">
                            {post.map(post => (
                                <PostCard
                                    key={post._id}
                                    post={post} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block lg:w-64 xl:w-80 fixed right-0 top-16 bottom-0 overflow-y-auto p-4">
                    <RightSideBar />
                </div>

            </main>
        </div>
    )
}
export default HomePage