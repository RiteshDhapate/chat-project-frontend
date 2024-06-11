"use client";
import React, { createContext, useState, useEffect, useLayoutEffect, useContext } from "react";

// Create a context
export const ShowHideContext = createContext();

// Create a provider component
export const ShowHideProvider = ({ children }) => {
   const [showHide, setShowHide] = useState(false);
   const claSize = () => {
     if (typeof window === "undefined") return;
     setShowHide(window?.innerWidth >= 768 ? true : false);
   };
   useLayoutEffect(() => {
     if (typeof window === "undefined") return;
     setShowHide(window?.innerWidth >= 768 ? true : false);
   }, []);
   useEffect(() => {
     window.addEventListener("resize", claSize);

     // Return a cleanup function to remove the event listener
     return () => {
       window.removeEventListener("resize", claSize);
     };
   }, []);

  return (
    // Provide the show/hide state and setter to children
    <ShowHideContext.Provider value={{ showHide, setShowHide }}>
      {children}
    </ShowHideContext.Provider>
  );
};


export const useShowHideContext = () => { 
    const { showHide, setShowHide } = useContext(ShowHideContext);
    return { showHide, setShowHide };
};