"use client";
import { Spotlight } from "@/components/ui/Spotlight";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/functions/sendRequest";
import { useToast } from "@/components/ui/use-toast";
import { getAllGroups } from "@/utils/functions/getGroups";
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
    await getAllGroups(setUsers, setError, route);
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

  const handleRedirectChat = (id)=>{
    route.push(`chats/${id}?type=group`);
  }

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
                onClick={() => handleRedirectChat(user._id)}
                className="w-full h-14 mt-5 bg-primar cursor-pointer flex justify-between items-center px-5 overflow-hidden hover:bg-gray-100 dark:hover:bg-black/10 "
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
              </div>
            ))}
          {/* shoe search users */}
          {loding === false &&
            searchUsers.length > 0 &&
            searchUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => handleRedirectChat(user._id)}
                className="w-full h-14 mt-5 bg-primar cursor-pointer flex justify-between items-center px-5 overflow-hidden hover:bg-gray-100 dark:hover:bg-black/10 "
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
            <h1 className="text-2xl font-semibold text-center">
              No any Group{" "}
            </h1>
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
