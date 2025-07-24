"use client"

import React, { useState,useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar"
import RightSideBar from "../components/RightSideBar"
import StorySection from "../story/StorySection"
import NewPostForm from "../components/posts/NewPostForm"
import PostCard from "../components/posts/PostCard"
import useUserStore from "@/store/UserStore";
import axios from "axios";
import { useStore } from "zustand";
const HomePage = () => {
    const [message,setMessage] = useState("")
    const [posts,setPosts] = useState([])
    const userId = useStore(useUserStore, (state)=>state.userId)
    console.log(`inside post page js, current userId is: ${JSON.stringify(userId)}`)

useEffect(()=>{
    fetchPosts();
  },[]);


const fetchPosts = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/posts', {
                command: 'select',
                data: {}
            });
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error(error);
            setMessage('Error fetching posts: ' + (error.response?.data?.message || error.message));
        }
    };


    const handlePostCommand = async(command,textAreaPostContent,userId, data = {}) => {
            try{
                console.log(`this is the command ${command}, this is the data ${JSON.stringify(data)}, this is the post content ${JSON.stringify(textAreaPostContent)}`)
                console.log(`inside handle post, user id is ${userId}`)
                const response = await axios.post('http://localhost:5000/api/posts',{
                command,
                data:{
                postContent:textAreaPostContent,
                creatorId:userId,
                ...data
                //imageUrl:needToImplement
                }
                });
                setMessage(response.data.message || 'Operation completed successfully.');
                console.log(`response post id is ${response.data.post._id}`);
                console.log(`response post is ${response.data.post}`);
                //zustand store actions here maybe?
                fetchPosts();
                }
            catch(error){
            console.error(error);
            setMessage('Error: ' + (error.response?.data?.message||error.message));
            }
        }


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
                            handlePostCommand={handlePostCommand}
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