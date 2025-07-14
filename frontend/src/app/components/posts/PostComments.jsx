import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const PostComments = ({ comments = [] }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const visibleComments = showAllComments ? comments : comments.slice(0, 2);
    return (
        //comment section list
        <div className="mt-4">
            <h3 className="font-semibold mb-2">Comments</h3>
            <div className="max-h-60 overflow-y-auto pr-2">
                {visibleComments?.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                        <Avatar className="h-8 w-8 ">
                            <AvatarImage />
                            <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                                <p className="font-bold text-sm">{comment?.user?.username}</p>
                                <p className="text-sm">{comment?.user?.text}</p>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                                <Button variant="ghost" size="sm">Like</Button>
                                <Button variant="ghost" size="sm">Reply</Button>
                                <span>{comment?.createAt}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {comments.length > 2  && (
                    <p className="w-40 mt-2 text-blue-500 dark:text-gray-300" onClick={() => setShowAllComments(!showAllComments)}>
                        {showAllComments ? (
                            <>show less<ChevronUp className="ml-2 h-4 w-4" /></>
                        ) : (
                            <>show all comments<ChevronDown className="ml-2 h-4 w-4" /></>
                        )}
                    </p>
                )}
            </div>
        </div>
    )
}

export default PostComments