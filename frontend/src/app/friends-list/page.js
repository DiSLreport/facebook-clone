"use client"
import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import FriendRequest from "./FriendRequest";
import FriendSuggestion from "./FriendSuggestion";

const FriendListPage = () => {
    const [loading, setLoading] = useState(false)
    const friendRequest = [{}]
    const friendSuggestion = [{

    }]
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[rgb(36,37,38)] ">
            <LeftSideBar />
            <main className="ml-0 md:ml-64 mt-16 p-6">
                <h1 className="text-2xl font-bold mb-6">Friends Requests</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <FriendCardSkeleton />
                    ) : friendRequest.length === 0 ? (
                        <NoFriendsMessage
                            text="No friend requests"
                            description="search for MORE firends!!"
                        />
                    ) : (
                        friendRequest.map((friend) => (
                            <FriendRequest 
                             friend={friend}
                             />
                        ))
                    )}
                </div>

                <h1 className="text-2xl font-bold mb-6">people you may know</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <FriendCardSkeleton />
                    ) : friendSuggestion.length === 0 ? (
                        <NoFriendsMessage
                                text="No friend suggestions"
                                description="need MORE friends!!"
                        />
                    ) : (
                        friendSuggestion.map((friend) => (
                            <FriendSuggestion friend={friend}/>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default FriendListPage;