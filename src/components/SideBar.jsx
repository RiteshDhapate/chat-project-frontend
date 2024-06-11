"use client";
import { TypewriterEffect } from "./ui/ui/Typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { containerVars, menuVars, mobileLinkVars } from "@/utils/variants";
import { links } from "@/utils/links";
import { CircleX } from "lucide-react";
import { useShowHideContext } from "@/utils/providers/sideBarToogleProvider";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserDetail } from "@/utils/functions/getUserDetails";
import { ThemeToogleMode } from "./ui/ThemeToogleMode";

const SideBar = () => {
  const { showHide, setShowHide } = useShowHideContext();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const route = useRouter();
  const pathname = usePathname();

  const getUserInfo = async () => {
    const userDate = await getUserDetail(setError, route);
    setUser(userDate);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    showHide && (
      <div className=" z-50 bg-white dark:bg-[#121212] fixed top-0 left-0 md:relative h-screen ">
        <div className="relative md:hidden cursor-pointer">
          <div
            onClick={() => setShowHide(false)}
            className=" bg-primary rounded-full p-1 text-white absolute top-5 -right-10 z-50"
          >
            <CircleX />
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className=" w-[250px] h-full flex flex-col justify-between shadow-xl shadow-gray-500 dark:shadow-gray-600"
          >
            <div>
              {/* logo */}
              <div className="w-full mt-5 flex justify-center items-center">
                <TypewriterEffect
                  className="text-2xl"
                  words={[{ text: "SwiftTalk" }]}
                />
              </div>
              {/* nav items */}
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="mt-10 w-full"
              >
                {links.map((link, index) => (
                  <motion.div key={index} variants={mobileLinkVars}>
                    <Link
                      href={link.href}
                      className={`flex justify-start items-center gap-5 pl-10 py-5 h-8  text-xl mt-5 rounded-full hover:bg-primary hover:shadow-lg hover:shadow-gray-600 dark:hover:shadow-pink-700 ${
                        link.href == pathname &&
                        "bg-primary shadow-lg shadow-gray-600 dark:shadow-pink-700"
                      }`}
                    >
                      <div>{link.logo}</div>
                      <div>{link.name}</div>
                    </Link>
                  </motion.div>
                ))}
                <motion.div  variants={mobileLinkVars}>
                  
                <div
                  className={`flex justify-start items-center gap-5 pl-10 py-5 h-8  text-xl mt-5 rounded-full
                    }`}
                    >
                  <ThemeToogleMode/>
                </div>
                  </motion.div>
              </motion.div>
            </div>
            {user && (
              <motion.div
                initial={{
                  scale: 0,
                }}
                whileInView={{
                  scale: 1,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.3,
                }}
                className="mb-5 w-full bg-primary rounded-full flex gap-2 items-center pl-5 shadow-lg shadow-gray-600 dark:shadow-black"
              >
                <div>
                  <Image
                    width={50}
                    height={50}
                    src={user?.profileImage}
                    className="w-[40px] h-[40px] rounded-full shadow-lg shadow-zinc-900"
                  />
                </div>
                <div className="flex flex-col ">
                  <h1 className="font-semibold text-lg text-gray-100">
                    {user?.userName}
                  </h1>
                  <p className="text-[12px] text-gray-400">{user?.email}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  );
};

export default SideBar;
