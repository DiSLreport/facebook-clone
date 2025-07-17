"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide header only on /user-login
  const hideHeader = pathname === '/user-login';
      {!hideHeader && <Header />}

  return (
    // in react we need to wrap everything in <div> or <>, doesn't really matter
    <> 
      {console.log(hideHeader)}
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
export default LayoutWrapper