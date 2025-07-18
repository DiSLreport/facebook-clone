import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase"; // Adjust the path if needed

const useUserFullName = () => {
  const [fullName, setFullName] = useState("Loading...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch(`http://localhost:5000/api/user/${user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            const name = data?.user?.name || "";
            const lastName = data?.user?.lastName || "";
            setFullName(`${name} ${lastName}`.trim() || "No Name");
          })
          .catch((err) => {
            console.error("Failed to fetch user full name:", err);
            setFullName("Unknown User");
          });
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return fullName;
};

export default useUserFullName;
