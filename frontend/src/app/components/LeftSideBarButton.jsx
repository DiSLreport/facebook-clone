"use client";
import { Button } from "@/components/ui/button";
import { Bell, Home, MessageCircle, User, Users, Video } from "lucide-react";
import { useRouter } from "next/navigation";

const LeftSideBarButtonComponent = ({ buttonText = "none" }) => {
  const router = useRouter();

  let Icon = Home;
  let path = "/";

  switch (buttonText.toLowerCase()) {
    case "home":
      Icon = Home;
      path = "/";
      break;
    case "friends":
      Icon = Users;
      path = "/friends-list";
      break;
    case "video":
      Icon = Video;
      path = "/video-feed";
      break;
    case "profile":
      Icon = User;
      path = "/user-profile";
      break;
    case "messages":
      Icon = MessageCircle;
      path = "/";
      break;
    case "notifications":
      Icon = Bell;
      path = "/";
      break;
    default:
      Icon = Home;
      path = "/";
      break;
  }

  const handleNavigation = () => {
    router.push(path);
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={handleNavigation}
      >
        <Icon className="mr-4" />
        {buttonText}
      </Button>
    </div>
  );
};

export default LeftSideBarButtonComponent;
