"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useSidebarStore from "@/store/sidebarStore"
import { Bell, Home, MessageCircle, Users, Video } from "lucide-react"
import React from "react"

const LeftSideBar = () => {
    const {isSidebarOpen,toggleSidebar}=useSidebarStore()
    return (
        <aside className={`fixed top-16 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out 
  flex flex-col z-50 md:z-0 md:translate-x-0 
  ${isSidebarOpen ? "translate-x-0 bg-white dark:bg-[rgb(36,37,38)] shadow-lg" : "-translate-x-full"}${isSidebarOpen?"md:hidden":""} md:bg-transparent md:shadow-none`}>


            <div className="flex flex-col h-full overflow-y-auto">
                {/*navagation menu*/}
                <nav className="space-y-4 flex-grow">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <Avatar className="h-10 w-10 ">
                            <AvatarImage />
                            <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                            Generic Name
                        </span>
                    </div>
                    <div>
                        <Button variant="ghost" className="full justify-start">
                            <Home className="mr-4" />Home
                        </Button>
                    </div>


                    <Button variant="ghost" className="full justify-start">
                        <Users className="mr-4" />Friends
                    </Button>

                    <Button variant="ghost" className="full justify-start">
                        <Video className="mr-4" />Video
                    </Button>

                    <Button variant="ghost" className="full justify-start">
                        <MessageCircle className="mr-4" />Messages
                    </Button>

                    <Button variant="ghost" className="full justify-start">
                        <Bell className="mr-4" />Notofications
                    </Button>
                </nav>
                {/*footer here*/}
                <div className="mb-16">
                    <Separator className="my-4" />
                    <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                        <Avatar className="h-10 w-10 ">
                            <AvatarImage />
                            <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                            Generic Name
                        </span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p>Privacy Terms Advertising</p>
                        <p>Effi Land 2025</p>
                    </div>

                </div>
            </div>
        </aside>
    )
}
export default LeftSideBar