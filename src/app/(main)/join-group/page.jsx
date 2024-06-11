"use client";
import { Spotlight } from "@/components/ui/Spotlight";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import  { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAllGroupsJoin } from "@/utils/functions/getAllGroupsJoin";
import { joinGroup } from "@/utils/functions/joinGroup";
import ToogleSidebar from "@/components/ToogleSidebar";

const page = () => {
  // sates
  const words = `Send and receive messages without keeping your phone online`;
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();
  const { toast } = useToast();
  // functions
  const getAllUserForSentRequest = async () => {
    setLoding(true);
    await getAllGroupsJoin(setUsers, setError, route);
    setLoding(false);
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchUsers([]);
      return;
    }
    const data = users.filter((user) => user.groupName.includes(e.target.value));
    setSearchUsers(data);
  };

  const handleSendRequest = async (to) => {
    await joinGroup(to, setError, toast, route);
    getAllUserForSentRequest();
  };

  useEffect(() => {
    getAllUserForSentRequest();
  }, []);

  useEffect(() => {
    if (error === "") return;
    toast({
      title: error,
    });
  }, [error]);

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        route.push("/login");
      }
    }, []);

  return (
    <div className="w-full h-screen flex">
      {/* users lists */}
      <div className="w-full sm:w-[400px] flex flex-col h-screen shadow-lg shadow-primary">
        <div className="w-full h-14 p-5 flex items-center gap-2">
          <div className="block md:hidden">
            <ToogleSidebar />
          </div>
          <Input
            type="search"
            placeholder="Search Friend "
            className="border-primary border-2 rounded-full"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        {/* User lists */}
        <div className="w-full flex-1 pt-7 overflow-y-scroll">
          {users &&
            searchUsers.length === 0 &&
            loding === false &&
            users.map((user, index) => (
              <div
                key={index}
                className="w-full h-14 mt-5 bg-primar flex justify-between items-center px-5 overflow-hidden hover:bg-gray-100 dark:hover:bg-black/10 "
              >
                <div className="flex">
                  <Image
                    src={user.profileImage}
                    width={100}
                    height={100}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="ml-3 flex items-center">
                    <h1 className="text-xl font-semibold ">{user.groupName}</h1>
                  </div>
                </div>
                <button
                  onClick={() => handleSendRequest(user._id)}
                  class="relative inline-flex ml-7 items-center justify-center w-[120px] h-[40px] overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
                >
                  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute flex items-center justify-center  text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Join
                  </span>
                  <span class="relative invisible">Join</span>
                </button>
              </div>
            ))}
          {/* shoe search users */}
          {loding === false &&
            searchUsers.length > 0 &&
            searchUsers.map((user, index) => (
              <div
                key={index}
                className="w-full h-14 mt-5 bg-primar flex justify-between items-center px-5 overflow-hidden hover:bg-gray-100 dark:hover:bg-black/10 "
              >
                <div className="flex">
                  <Image
                    src={user.profileImage}
                    width={100}
                    height={100}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="ml-3 flex items-center">
                    <h1 className="text-xl font-semibold ">{user.groupName}</h1>
                  </div>
                </div>
                <button class="relative inline-flex ml-7 items-center justify-center w-[120px] h-[40px] overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute flex items-center justify-center  text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Join
                  </span>
                  <span class="relative invisible">Request</span>
                </button>
              </div>
            ))}
          {/* show loding state */}
          {loding &&
            Array.from([1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7]).map(() => (
              <div className="w-full h-14 mt-5 bg-primar flex  items-center px-5 overflow-hidden">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <div className="ml-3">
                  <Skeleton className="w-[150px] h-14 rounded-xl" />
                </div>
                <Skeleton className="w-[100px] h-14 ml-10 rounded-full" />
              </div>
            ))}
          {loding === false && users.length === 0 && (
            <h1 className="text-2xl font-semibold text-center">No any Group</h1>
          )}
        </div>
      </div>
      <div className="hidden flex-1  h-screen relative p-2 md:p-5 sm:flex sm:flex-col justify-center items-center">
        <Spotlight className="md:left-60 md:-top-20" fill="white" />
        <Spotlight className=" md:left-60 md:-top-20" fill="black" />
        <Spotlight className="md:left-10 md:top-50" fill="white" />
        <Spotlight className=" md:left-10 md:top-50" fill="black" />
        <motion.div
          initial={{
            scale: 0,
            y: -100,
          }}
          whileInView={{
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="w-full h-10 flex justify-center items-center"
        >
          <Image src="/logo.png" width={100} height={100} />
        </motion.div>
        <TextGenerateEffect words={words} className="mt-7 text-center" />
      </div>
    </div>
  );
};

export default page;
