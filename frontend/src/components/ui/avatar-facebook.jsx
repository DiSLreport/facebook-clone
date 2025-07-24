import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/UserStore";
//import UseUserFirstLetter from "./UseUserFirstLetter";


const AvatarFacebook = ({
  avatarClassNameSpesific = "h-10 w-10",
  avatarFallbackclassNameSpesific = "dark:bg-gray-400",
  userName = "Generic User", //username from mongo, need to implement
}) => {
  
userName = useUserStore.getState().userData.name
//   {/const firstNameLetter = userName?.charAt(0).toUpperCase() || "H";/}
//   const firstNameLetter = <UseUserFirstLetter/> 
  return (
    <div className="flex items-center space-x-2 mb-4 cursor-pointer">
    <div>
      <Avatar className={avatarClassNameSpesific}>
        <AvatarImage src="https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt5f18c2119ce26485/6668df65db90945e0caf9be6/beautiful-flowers-lotus.jpg?q=70&width=3840&auto=webp" alt="User Avatar" />
        <AvatarFallback className={avatarFallbackclassNameSpesific}>
         
         {/* {firstNameLetter}*/}
        </AvatarFallback>
      </Avatar>
    </div>
    <span className="font-semibold">
    {userName}
    </span>
    </div>
  );
};

export default AvatarFacebook;
