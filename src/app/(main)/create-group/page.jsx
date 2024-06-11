"use client";
import ToogleSidebar from "@/components/ToogleSidebar";
import { TypewriterEffect } from "@/components/ui/ui/Typewriter-effect";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { createGroup } from "@/utils/functions/createGroup";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  // states
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("");
  const [uploadImageLoding, setUploadImageLoding] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://cytihhzrkrgmfltjmgns.supabase.co/storage/v1/object/public/images/public/group.png"
  );
  const [error, setError] = useState("");
  const [loding, setLoding] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  // functions

  // handle user image upload function
  const uploadImage = async (event) => {
    try {
      setUploadImageLoding(true);
      setButtonDisable(true);
      let file = event.target.files[0];
      if (!file) return;
      const UniqueId = new Date().getTime();
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`public/${UniqueId}-${file.name}`, file);

      file = null;
      if (data) {
        const ImageUrl = `https://cytihhzrkrgmfltjmgns.supabase.co/storage/v1/object/public/${data.fullPath}`;
        setProfileImage(ImageUrl);
      }
      if (error) {
        setError("profile Image Upload Failed. please try again");
      }
      setUploadImageLoding(false);
      setButtonDisable(false);
    } catch (error) {
      setButtonDisable(false);
      setUploadImageLoding(false);
      setError("Image upload failed. please try again");
    }
  };
  // handle register function callbacks
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    setButtonDisable(true);
    await createGroup(userName, about, profileImage, setError, toast, route);
    setButtonDisable(false);
    setLoding(false);
  };

  // use effects
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
    <div className="w-full h-screen  justify-center items-center">
      <div className="block md:hidden">
        <div className="flex items-center gap-5 p-5">
          <ToogleSidebar />
          <TypewriterEffect
            className="text-2xl text-left"
            words={[{ text: "SwiftTalk" }]}
          />
        </div>
      </div>
      <div className="w-full h-[90vh] flex justify-center md:items-center">
        <div className=" text-white tilt-in-fwd-tr flex flex-col items-center pt-16 sm:justify-center sm:pt-0">
          <div className="relative mt-12 w-full max-w-lg sm:mt-10">
            <div
              className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
              bis_skin_checked="1"
            ></div>
            <div className="mx-5 border  sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 rounded-lg border-white/20 border-l-white/20 border-r-white/20 dark:sm:shadow-sm dark:lg:rounded-xl ">
              <div className="flex flex-col p-6">
                <h3 className="text-xl font-semibold leading-6 text-black dark:text-white tracking-tighter">
                  Create group
                </h3>
                <p className="mt-1.5 text-sm font-medium text-black/50 dark:text-white/50">
                  Welcome , enter your credentials to continue..
                </p>
              </div>
              <div className="p-6 pt-0">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <div className="flex justify-center items-center">
                      <div className="w-[100px] h-[100px] group relative rounded-full border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                        <div className="flex justify-center items-center">
                          <label
                            htmlFor="profileImage"
                            className="text-xs cursor-pointer font-medium text-muted-foreground dark:group-focus-within:text-white text-gray-400"
                          >
                            <Image
                              src={profileImage}
                              fill
                              alt="user profile image"
                              className="rounded-full w-[90px] h-[90px]"
                            />
                          </label>
                        </div>
                        <input
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(event) => uploadImage(event)}
                          placeholder="User Name"
                          autoComplete="off"
                          id="profileImage"
                          className=" hidden w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground dark:group-focus-within:text-white text-gray-400">
                            User Name
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={userName}
                            onChange={(event) =>
                              setUserName(event.target.value)
                            }
                            placeholder="User Name"
                            className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground dark:group-focus-within:text-white text-gray-400">
                            About
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={about}
                            onChange={(event) => setAbout(event.target.value)}
                            placeholder="About group..."
                            className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-x-2">
                    <button
                      disabled={loding || buttonDisable ? true : false}
                      className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                      type="submit"
                    >
                      {loding ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Create group"
                      )}
                    </button>
                    {uploadImageLoding && (
                      <p className="flex text-green-800">
                        Image uploding <Loader className="animate-spin" />
                      </p>
                    )}
                  </div>
                  <div className="text-red-900">{error}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
