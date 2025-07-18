"use client"
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageCircle, Share2, ThumbsUp, Send } from "lucide-react";
import VideoComments from "./VideoComments";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const VideoCard = ({ post }) => {
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
    const [showComments, setShowComments] = useState(false)
    
    const handleShare = (platform) => {
        const generateSharedLink = () => window.location.href;
        const url = generateSharedLink(); 
        let shareUrl;
        
        switch (platform) {
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
                navigator.clipboard.writeText(url);
                setIsShareDialogOpen(false);
                return;
            default:
                return;
        }
        window.open(shareUrl, '_blank');
        setIsShareDialogOpen(false);
    };

    return (
        <motion.div
            key={post?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[rgb(36,37,38)] rounded-lg shadow-lg overflow-hidden"
        >
            <div>
                <div className="flex items-center justify-between mb-4 px-4 mt-2">
                    <div className="flex items-center">
                        <Avatar className="h-10 w-10 rounded mr-3">
                            <AvatarImage />
                            <AvatarFallback className="dark:bg-gray-400">Z</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold dark:text-white">Generic Name</p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">12-02-0000</span>
                    </div>
                </div>
                <div className="relative aspect-video bg-black mb-4">
                    {post?.mediaUrl && (
                        <video controls className="w-full h-[500px] rounded-lg mb-4">
                            <source src={post?.mediaUrl} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                <div className="md:flex justify-between px-2 mb-2 items-center">
                    <div className="flex space-x-4">
                        <Button
                            variant="ghost" className="flex dark:hover:bg-gray-600 items-center"
                        >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            <span>Likes</span>
                        </Button>
                        <Button
                            variant="ghost" className="flex items-center dark:hover:bg-gray-600"
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>comment</span>
                        </Button>
                        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="flex items-center dark:hover:bg-gray-500">
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
                                    <Button onClick={() => handleShare('facebook')}>Share on FaceBook</Button>
                                    <Button onClick={() => handleShare('twitter')}>Share on twitter</Button>
                                    <Button onClick={() => handleShare('linkedin')}>Share on LinkedIn</Button>
                                    <Button onClick={() => handleShare('copy')}>copy link</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex space-x-4 ml-4 text-sm text-gray-500 dark:text-gray-400">
                        <Button variant="ghost" size="sm" >
                            3 likes
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
                            3 comments
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setIsShareDialogOpen(true)}>
                            3 share
                        </Button>
                    </div>
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
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                <VideoComments comments={post.comments} />
                            </ScrollArea>

                            <div className="flex items-center mt-4">
                                <Avatar className="h-10 w-10 rounded mr-3">
                                    <AvatarImage />
                                    <AvatarFallback className="dark:bg-gray-400">Z</AvatarFallback>
                                </Avatar>
                                <Input
                                    className="flex-1 mr-2 dark:border-gray-400"
                                />
                                <Button>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default VideoCard