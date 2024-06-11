"use client";
import { Spotlight } from "@/components/ui/Spotlight";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getAllUsersAcceptRequest } from "@/utils/functions/getAllUsersAcceptRequest";
import { acceptRequest } from "@/utils/functions/acceptRequest";
import { rejectRequest } from "@/utils/functions/rejectRequest";
import { Loader } from "lucide-react";
import ToogleSidebar from "@/components/ToogleSidebar";

const page = () => {
  // sates
  const words = `Send and receive messages without keeping your phone online`;
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [acceptRequestLoding, setAcceptRequestLoding] = useState(false);
  const [rejectRequestLoding, setRejectRequestLoding] = useState(false);
  const route = useRouter();
  const { toast } = useToast();
  // functions
  const getAllUserForAcceptRequest = async () => {
    setLoding(true);
    await getAllUsersAcceptRequest(setUsers, setError, route);
    setLoding(false);
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchUsers([]);
      return;
    }
    const data = users.filter((user) => user.userName.includes(e.target.value));
    setSearchUsers(data);
  };

  // handle popup box
  const handleAcctions = async (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const cancelPopup = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // handle accept Request
  const accpetRequestHandle = async () => {
    setAcceptRequestLoding(true);
    await acceptRequest(selectedUser?._id, setError, route, toast);
    setAcceptRequestLoding(false);
    cancelPopup();
    getAllUserForAcceptRequest();
  };

  // handle reject request
  const rejectRequestHandle = async () => {
    setRejectRequestLoding(true);
    await rejectRequest(selectedUser?._id, setError, route, toast);
    setRejectRequestLoding(false);
    cancelPopup();
    getAllUserForAcceptRequest();
  };

  useEffect(() => {
    getAllUserForAcceptRequest();
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
    <div className="w-full h-screen flex relative">
      {/* dialog box */}
      {openDialog && selectedUser !== null && (
        <div className="absolute top-0 left-0 h-full w-full z-[150] bg-white/70 dark:bg-black/50  flex justify-center items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              duration: 0.3,
            }}
            className="w-[90%] h-[200px] md:w-[500px] bg-black dark:bg-white rounded-2xl flex flex-col justify-between p-5"
          >
            {/* user data */}
            <div className="flex justify-center items-center">
              <Image
                src={selectedUser?.profileImage}
                width={100}
                height={100}
                className="w-[70px] h-[70px] rounded-full"
              />
              <div className="ml-5">
                <h1 className="text-white dark:text-black text-2xl font-semibold">
                  {selectedUser?.userName}
                </h1>
                <p className="text-gray-400 dark:text-gray-500 font-[10px]">
                  {selectedUser?.about}
                </p>
              </div>
            </div>
            {/* actions */}
            <div className="flex justify-center gap-x-10">
              <Button variant="outline" onClick={cancelPopup}>
                Cencel
              </Button>
              <Button
                onClick={accpetRequestHandle}
                className="bg-green-700 hover:bg-green-500 cursor-pointer"
                asChild
              >
                {acceptRequestLoding ? (
                  <p>
                    <Loader className="animate-spin" />
                  </p>
                ) : (
                  <p>Accept</p>
                )}
              </Button>
              <Button
                onClick={rejectRequestHandle}
                variant="destructive"
                className="bg-red-600 hover:bg-red-500"
              >
                {rejectRequestLoding ? (
                  <p>
                    <Loader className="animate-spin" />
                  </p>
                ) : (
                  <p>Reject</p>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
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
                onClick={() => handleAcctions(user)}
                className="w-full h-14 mt-5 cursor-pointer bg-primar flex justify-between items-center px-5 overflow-hidden hover:bg-gray-100 dark:hover:bg-black/10 "
              >
                <div className="flex">
                  <Image
                    src={user.profileImage}
                    width={100}
                    height={100}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="ml-3">
                    <h1 className="text-xl font-semibold ">{user.userName}</h1>
                    <p className="text-[12px] dark:text-gray-300 text-gray-600  overflow-hidden text-ellipsis">
                      {user.about}
                    </p>
                  </div>
                </div>
                {/* 00 */}
              </div>
            ))}
          {/* shoe search users */}
          {loding === false &&
            searchUsers.length > 0 &&
            searchUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => handleAcctions(user)}
                className="w-full h-14 mt-5 cursor-pointer bg-primar flex justify-between items-center px-5 overflow-hidden hover:bg-gray-100 dark:hover:bg-black/10 "
              >
                <div className="flex">
                  <Image
                    src={user.profileImage}
                    width={100}
                    height={100}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="ml-3">
                    <h1 className="text-xl font-semibold ">{user.userName}</h1>
                    <p className="text-[12px] dark:text-gray-300 text-gray-600  overflow-hidden text-ellipsis">
                      {user.about}
                    </p>
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
              No any request
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
