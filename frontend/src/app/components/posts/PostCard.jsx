import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, MoreHorizontal, ThumbsUp, Share, Share2 } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from "@/components/ui/dialog";
import PostComments from "./PostComments";
import AvatarFacebook from "@/components/ui/avatar-facebook";


const PostCard = ({ postId, postText, creatorId, createdAt, updatedAt }) => {
    // console.log(`inside post card, post is: ${JSON.stringify(postText)}`)
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const date = new Date(createdAt)
    
    const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
    const formattedTime = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });


    // console.log(`inside post, date is ${JSON.stringify(formattedDate)}`)

    const generateSharedLink = () => {
        return `http://localhost:3000/${postId}` //for this to work we need to implement posts url
    }
    const handleShare = (platform) => {
        const url = generateSharedLink()
        let shareUrl;
        switch (platform) { //for this to work we need to implement posts url
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
                break;
            case "copy":
                navigator.clipboard.writeText(url)
                setIsShareDialogOpen(false)
                return;
            default:
                return;
        }
        window.open(shareUrl, '_blank')
        setIsShareDialogOpen(false)
    }
    return (
        <motion.div
            key={postId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <CardContent className="p-6 dark:text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 cursor-pointer">
                            <AvatarFacebook userId = {creatorId}/>
                            <div>
                                {/* <p className="font-semibold dark:text-white">Generic Name</p> */}
                                <p className="font-semibold text-gray-500"> {formattedDate} {formattedTime}</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="dark:hover:bg-gray-500">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="mb-4">{postText}</p>
                    {/* {post.mediaUrl && ( //add && post.mediaType === "image" later
                        <img
                            src={post?.mediaUrl}
                            alt='post_image'
                            className='w-full h-auto rounded-lg mb-4'
                        />
                    )} */}
                    {/* {post?.mediaUrl && post.mediaType === "video" && (
                        <video controls className="w-full h-[500px] rounded-lg mb-4">
                            <source src={post?.mediaUrl} type='video/mp4' />
                            your browser does not support the video tag
                        </video>
                    )} */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500 dark-gray-400 hover:border-b-3 border-gray-400 cursor-pointer">likes</span>
                        <div className="flex gap-3">
                            <span className="text-sm text-gray-500 dark-gray-400 hover:border-b-3 border-gray-400 cursor-pointer" onClick={() => setShowComments(!showComments)}>comments</span>
                            <span className="text-sm text-gray-500 dark-gray-400 hover:border-b-3 border-gray-400 cursor-pointer">shares</span>
                        </div>
                    </div>
                    <Separator className="mb-2 dark:bg-gray-400" />
                    <div className="flex justify-between mb-2">
                        <Button
                            variant="ghost" className="flex-1 dark:hover:bg-gray-600"
                        >
                            <ThumbsUp className="mr-2 h-4 w-4" />Likes
                        </Button>
                        <Button
                            variant="ghost" className="flex-1 dark:hover:bg-gray-600"
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />comments
                        </Button>
                        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="flex-1 dark:hover:bg-gray-500">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    share
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Share with friends</DialogTitle>
                                    <DialogDescription>share with who?</DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col space-y-4">
                                    <Button onClick={() => handleShare('facebook')}>
                                        Share on EffiBook
                                    </Button>
                                    <Button onClick={() => handleShare('twitter')}>
                                        Share on twitter
                                    </Button>
                                    <Button onClick={() => handleShare('linkdin')}>
                                        Share on linkdin
                                    </Button>
                                    <Button onClick={() => handleShare('copy')}>
                                        copy link
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Separator className="mb-2 dark:bg-gray-400" />
                    <AnimatePresence>
                        {showComments && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* <PostComments
                                    comments={post.comments}
                                /> */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>

        </motion.div>

    )
}
export default PostCard