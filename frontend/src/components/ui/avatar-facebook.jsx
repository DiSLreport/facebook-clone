import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import UseUserFirstLetter from "./UseUserFirstLetter";


const AvatarFacebook = ({
  avatarClassNameSpesific = "h-10 w-10",
  avatarFallbackclassNameSpesific = "dark:bg-gray-400",
  userName = "H", //username from mongo, need to implement
}) => {
//   {/const firstNameLetter = userName?.charAt(0).toUpperCase() || "H";/}
//   const firstNameLetter = <UseUserFirstLetter/> 
  return (
    <div>
      <Avatar className={avatarClassNameSpesific}>
        <AvatarImage src="" alt="User Avatar" />
        <AvatarFallback className={avatarFallbackclassNameSpesific}>
         {/* {firstNameLetter}*/}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarFacebook;
