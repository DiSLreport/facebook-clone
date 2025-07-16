import React from "react";
import ProfileTabs from "./ProfileTabs";
import ProfileHeader from "./ProfileHeader";

const page = () => {
    return (
        <div>
            {<ProfileHeader />}
            <ProfileTabs />
        </div>
    );
};

export default page;
