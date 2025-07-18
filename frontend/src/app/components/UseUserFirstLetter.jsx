import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase";

const useUserFirstLetter = () => {
  // Default first letter shown before loading user name
  const [firstLetter, setFirstLetter] = useState("O_O");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch(`http://localhost:5000/api/user/${user.uid}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
            // Defensive check: if name exists and is a non-empty string
            const name = data.user?.name;
            if (typeof name === "string" && name.length > 0) {
              setFirstLetter(name.charAt(0).toUpperCase());
            } else {
              // fallback if no valid name
              setFirstLetter("?");
            }
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
            setFirstLetter("error"); // fallback letter on error
          });
      } else {
        // User not logged in, reset letter to default
        setFirstLetter("not logged");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return firstLetter;
};

export default useUserFirstLetter;
