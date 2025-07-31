import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/UserStore";
import { useState,useEffect } from "react";
import { useStore } from "zustand";
//import UseUserFirstLetter from "./UseUserFirstLetter";


const AvatarFacebook = ({
  avatarClassNameSpecific = "h-10 w-10",
  avatarFallbackclassNameSpecific = "dark:bg-gray-400",
  userName = null,
  userId = null,
  userMedia = "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?_gl=1*152dzl8*_ga*MTgxNjQxNzQyMi4xNzUzMzYyMDg2*_ga_8JE65Q40S6*czE3NTMzNjIwODYkbzEkZzEkdDE3NTMzNjIwOTAkajU2JGwwJGgw"
}) => {
      const connectedUserId = useStore(useUserStore, (state)=>state.userId)
      // const connectedUserName = useStore(useUserStore,(state)=>state.userData.name)
      // const connectedUserMediaUrl = useStore(useUserStore,(state)=>state.userData.userMediaUrl)
      const usersArray = useStore(useUserStore,(state)=>state.usersArray)
      const postUser = usersArray.find(({_id}) => _id===userId)
      const [displayedUserName, setDisplayedUserName] = useState("");
      const [displayedUserImageUrl, setDisplayedUserImageUrl] = useState("");
      console.log(`Inside avatar facebook, post user is: ${JSON.stringify(postUser)}`)
      console.log(`Inside avatar facebook, post user's media url is: ${JSON.stringify(postUser?.userMediaUrl)}`)
      
      const checkWhatUserIsConnected  =  () => {
              switch (userId){
                case connectedUserId:
                setDisplayedUserName(useUserStore.getState().userData.name)
                setDisplayedUserImageUrl(useUserStore.getState().userData.userMediaUrl)
                return
                case postUser._id:
                setDisplayedUserName(postUser.name)
                setDisplayedUserImageUrl(postUser.userMediaUrl)
                return
                default:
                setDisplayedUserName("default user")
                setDisplayedUserImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/500px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg")
                return
              }
            }

      useEffect(() => {
          checkWhatUserIsConnected();
      },[]) 
    
      
  //const connectedUserMediaType = useStore(useUserStore,(state)=>state.userData.userMediaType)  
  // if (!userId && useStore(useUserStore.getState().userId)){
  //   console.log(`user id inside avatar facebook is null, userName is: ${userName}`)
  //      userId = useStore(useUserStore, (state)=>state.userId)
  //      userName = useStore(useUserStore,(state)=>state.userData.name)
  //      userImage = useStore(useUserStore,(state)=>state.userData.userImageUrl)       
  // }

//   {/const firstNameLetter = userName?.charAt(0).toUpperCase() || "H";/}
//   const firstNameLetter = <UseUserFirstLetter/> 
  return (

    
    <div className="flex items-center space-x-2 mb-4 cursor-pointer">
      {/* {checkWhatUserIsConnected()} */}
      {/* {  userId===connectedUserId ? ( */}
      {/* {()=>checkWhatUserIsConnected()} */}
        <div className="flex items-center gap-2">
        <Avatar className={avatarClassNameSpecific}>
        <AvatarImage src={displayedUserImageUrl} alt="User Avatar" />
        <AvatarFallback className={avatarFallbackclassNameSpecific}>
         {/* {firstNameLetter}*/}
        </AvatarFallback>
        </Avatar>
        <span className="font-semibold">
          {console.log(` avatar facebook name: ${displayedUserName}`)}
        {displayedUserName}
        </span>
        </div>
    </div>
    
  )
};

export default AvatarFacebook;
