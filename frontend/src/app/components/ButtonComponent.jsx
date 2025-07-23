"use client";
import { Button } from "@/components/ui/button";
import { Bell, Home, MessageCircle, User, Users, Video } from "lucide-react";
import { useRouter } from "next/navigation";

const ButtonComponent = ({ buttonText = "none", isHeader = false }) => {
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
          className={isHeader ? "text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-transparent" : "w-full justify-start"} //if header, we don't want text
        onClick={handleNavigation}
      >
        <Icon className={isHeader ? "" : "mr-4"} />
        {!isHeader && buttonText}
      </Button>
    </div>
  );
};

export default ButtonComponent;
