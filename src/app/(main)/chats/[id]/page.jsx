"use client";

import SelectFilePop from "@/components/SelectFilePop";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Paperclip, SendHorizonal, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getChatDetails } from "@/utils/functions/getChatDetails";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useSocket } from "@/utils/context/socket";
import { getMessages } from "@/utils/functions/getMessages";
import ToogleSidebar from "@/components/ToogleSidebar";

const page = () => {
  // states
  const [openAttch, setOpenAttch] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [fileError, setFileError] = useState("");
  const [selectedFile, setselectedFile] = useState(null);
  const [fileUploadLoding, setFileUploadLoding] = useState(false);
  const [message, setMessage] = useState("");
  const [selectEmoji, setSelectEmoji] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [chatType, setChatType] = useState("");
  const [chatId, setChatId] = useState("");
  const [loding, setLoding] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [error, setError] = useState("");
  const [meId, setMeId] = useState("");
  const [messages, setMessages] = useState([]);
  const imageTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();
  const { toast } = useToast();
  const { socket } = useSocket();
  const scrollRef = useRef(null);

  // functions
  const handleOpenAttch = () => {
    setOpenAttch((prev) => !prev);
  };

  const createFileurl = (file) => {
    return URL.createObjectURL(file);
  };

  const handleSetImage = (e) => {
    setFileError("");
    const file = e.target.files[0];
    // check file type is valid or not
    if (!imageTypes.includes(file.type)) {
      setFileError("Invalid file type");
      return;
    }
    if (file.size >= 15000000) {
      setFileError("Image size must be less than 15mb");
      return;
    }

    setImage(file);
    setVideo(null);
    setFileUrl(createFileurl(file));
    setselectedFile(file);
  };

  const handleSetVideo = (e) => {
    setFileError("");
    const file = e.target.files[0];
    // check file type is valid or not
    if (file.type != "video/mp4") {
      setFileError("Invalid file type");
      return;
    }

    if (file.size >= 15000000) {
      setFileError("Video size must be less than 15mb");
      return;
    }

    setImage(null);
    setVideo(file);
    setFileUrl(createFileurl(file));
    setselectedFile(file);
  };

  const handleEmoji = function (data) {
    setMessage((prev) => prev + data.native);
  };

  const getChatdetailsHandler = async () => {
    setLoding(true);
    await getChatDetails(
      pathname.split("/")[2],
      searchParams.get("type"),
      setChatData,
      setError,
      route,
      setMeId
    );
    setLoding(false);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = (messageData, messageType) => {
    setError("");
    if (!localStorage.getItem("token")) {
      route.push("/login");
      return;
    }
    if (!chatId) {
      setError("chat is not available");
      return;
    }
    if (!chatType) {
      setError("chat type is not available");
      return;
    }

    socket.emit("sendMessage", {
      message: messageData || message,
      messageType: messageType || "text",
      chatType,
      to: chatId,
      token: localStorage.getItem("token"),
    });
    setMessage("");
  };

  const fetchMessages = async () => {
    await getMessages(
      setMessages,
      pathname.split("/")[2],
      searchParams.get("type"),
      setError,
      route
    );
  };

  const newMessage = async (data) => {
    const { from, to } = data;
    await fetchMessages();
    // scrollRef?.current?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    //   inline: "end",
    // });
  };

  const uploadFile = async (bucketName) => {
    try {
      const UniqueId = new Date().getTime();
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`public/${UniqueId}-${selectedFile.name}`, selectedFile);

      if (data) {
        const Url = `https://cytihhzrkrgmfltjmgns.supabase.co/storage/v1/object/public/${data.fullPath}`;
        setFileUrl(Url);
        sendMessage(Url, bucketName === "images" ? "image" : "video");
      }
      if (error) {
        setError("profile Image Upload Failed. please try again");
      }
      setFileUrl("");
    } catch (error) {
      setError("Error uploading file");
    } finally {
      setOpenAttch(false);
    }
  };

  const handleFileSend = async () => {
    // check file type is valid or not
    if (selectedFile.size >= 15000000) {
      setFileError("Video size must be less than 15mb");
      return;
    }
    setFileUploadLoding(true);
    // check file whats file image or video
    if (imageTypes.includes(selectedFile.type)) {
      await uploadFile("images");
    } else if (selectedFile.type == "video/mp4") {
      await uploadFile("videos");
    } else {
      setError("Invalid file");
    }
    setFileUploadLoding(false);
  };

  // use effects
  useEffect(() => {
    setChatId(pathname.split("/")[2]);
    setChatType(searchParams.get("type"));
    getChatdetailsHandler();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (error === "") return;

    toast({
      title: error,
    });
  }, [error]);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("newMessage", newMessage);

    return () => {
      socket.off("newMessage", newMessage);
    };
  }, []);



    useEffect(() => {
      if (!localStorage.getItem("token")) {
        route.push("/login");
      }
    }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {openAttch && (
        <div className="absolute z-[556] left-0 top-0 w-full h-screen flex justify-center items-center bg-white/60   dark:bg-black/60 ">
          <SelectFilePop
            handleOpenAttch={handleOpenAttch}
            handleSetImage={handleSetImage}
            handleSetVideo={handleSetVideo}
            fileError={fileError}
            fileUrl={fileUrl}
            image={image}
            video={video}
            handleFileSend={handleFileSend}
            fileUploadLoding={fileUploadLoding}
          />
        </div>
      )}
      {selectEmoji && (
        <div className="absolute bottom-[8vh] left-2 z-[555]">
          <Picker data={data} theme="dark" onEmojiSelect={handleEmoji} />
        </div>
      )}
      <div className="w-full h-[7vh] px-5  bg-[#dee2e6] shadow-xl dark:bg-[#121212] dark:shadow-black flex items-center">
        {loding ? (
          <>
            <Skeleton className="w-[50px] h-[50px] rounded-full shadow-xl shadow-[#2f3e46] dark:shadow-black " />
            <Skeleton className="w-[200px] h-[30px]  shadow-xl shadow-[#2f3e46] dark:shadow-black ml-5" />
          </>
        ) : (
          <>
            <div className="flex items-center mr-5 md:hidden">
              <ToogleSidebar />
            </div>
            <Image
              src={chatData?.profileImage}
              width={100}
              height={100}
              className="w-[50px] h-[50px] rounded-full shadow-xl shadow-[#2f3e46] dark:shadow-black "
            />
            <h1 className="font-semibold text-2xl ml-3">
              {chatType === "group" ? chatData?.groupName : chatData?.userName}
            </h1>
          </>
        )}
      </div>
      <div
        ref={scrollRef}
        className="w-full h-[85vh] overflow-y-scroll overflow-x-hidden px-5"
      >
        {/* <ThemeToogleMode /> */}
        {messages.length > 0 ? (
          messages.map((messageData, i) => (
            <div key={i}>
              <Message
                data={messageData}
                side={
                  messageData?.from.toString() != meId.toString()
                    ? "left"
                    : "right"
                }
              />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src="/robot.gif"
              width={100}
              height={100}
              className="w-[80%] md:w-[40%]"
            />
          </div>
        )}
      </div>
      <div className="w-full h-[8vh] p-5 bg-[#dee2e6]  dark:bg-black dark:opacity-50 flex items-center justify-center gap-x-5">
        <SmilePlus
          className="cursor-pointer"
          onClick={() => setSelectEmoji((prev) => !prev)}
        />
        <Paperclip className="cursor-pointer" onClick={handleOpenAttch} />
        <Input
          value={message}
          onFocus={() => setSelectEmoji(false)}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleEnterKeyPress(e)}
          className="text-black dark:text-white font-semibold text-lg"
        />

        {message && <SendHorizonal onClick={()=>sendMessage()} className="cursor-pointer" />}
      </div>
    </div>
  );
};

const Message = ({ data, side }) => {
  return (
    <div
      className={` w-fit max-w-[40%] mt-2 flex gap-2  ${
        side === "right" && "ml-auto"
      }`}
    >
      {data?.messageType == "text" ? (
        <p className="bg-primary rounded-xl p-2 shadow-lg shadow-black/40 dark:shadow-zinc-950">
          {data?.message}
        </p>
      ) : data?.messageType === "image" ? (
        <ImageShow src={data?.message} />
      ) : (
        <ShowVideo src={data?.message} />
      )}
    </div>
  );
};

export const ImageShow = ({ src }) => {
  return (
    <Image
      src={src}
      width={100}
      height={100}
      className=" w-[300px] h-fit max-h-[250px] rounded-lg shadow-lg shadow-black/40 dark:shadow-zinc-950"
    />
  );
};

export const ShowVideo = ({ src }) => {
  const [showController, setShowController] = useState(false);
  return (
    <video
      src={src}
      className="w-[300px] h-fit max-h-[250px] rounded-lg shadow-lg shadow-black/40 dark:shadow-zinc-950"
      controls={showController}
      onMouseEnter={() => setShowController(true)}
      onMouseLeave={() => setShowController(false)}
    />
  );
};

export default page;
