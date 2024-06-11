import { ImageShow, ShowVideo } from "@/app/(main)/chats/[id]/page";
import { X, Image as ImageIcon, Video, Loader } from "lucide-react";
import { Button } from "./ui/button";
const SelectFilePop = ({
  handleOpenAttch,
  handleSetImage,
  handleSetVideo,
  fileError,
  fileUrl,
  image,
  video,
  handleFileSend,
  fileUploadLoding,
}) => {
  return (
    <div className="relative w-[90%] sm:w-[400px] p-6 bg-black dark:bg-white  rounded-lg">
      <X
        onClick={handleOpenAttch}
        className="absolute top-2 right-2 hover:bg-white dark:hover:text-white dark:hover:bg-black hover:text-black  rounded-xl cursor-pointer text-white dark:text-black"
      />
      <div className="flex justify-center items-center mb-5">
        {image != null && video === null && <ImageShow src={fileUrl} />}
        {video != null && image === null && <ShowVideo src={fileUrl} />}
      </div>

      {(image != null || video != null) && (
        <Button
          onClick={handleFileSend}
          className="w-full text-xl font-semibold"
        >
          {fileUploadLoding ? <p><Loader  className="animate-spin"/></p> : <p>Send</p>}
        </Button>
      )}

      <div className="w-full mt-3 flex gap-5 justify-center items-center">
        <input
          type="file"
          onChange={(e) => handleSetImage(e)}
          accept="image/*"
          hidden
          id="image"
        />
        <label
          htmlFor="image"
          className=" hover:bg-white dark:hover:text-white dark:hover:bg-black hover:text-black  rounded-xl cursor-pointer text-white dark:text-black p-2"
        >
          <ImageIcon className="" />
        </label>
        <input
          type="file"
          onChange={(e) => handleSetVideo(e)}
          accept="video/*"
          hidden
          id="video"
        />
        <label
          htmlFor="video"
          className=" hover:bg-white dark:hover:text-white dark:hover:bg-black hover:text-black  rounded-xl cursor-pointer text-white dark:text-black p-2"
        >
          <Video className="" />
        </label>
      </div>
      {fileError && (
        <p className="text-red-900 font-semibold text-lg">{fileError}</p>
      )}
    </div>
  );
};

export default SelectFilePop;
