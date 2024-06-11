import axios from "axios";

export const getChatDetails = async (chatId,chatType,setData, setError, route,setMeID) => {
  try {
    setError("");

    const token = localStorage.getItem("token");

    // validate
    if (!token) {
      toast({
        title: "please login first",
      });
      route.push("/login");
      }
      
      if (!chatId || !chatType) {
          setError("Invalid credentials");
          return;
      }

    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/get-chat-details`, {
      token,
      chatId,
      chatType,
    });
    const data = res.data.data;
    setMeID(res.data.id);
    setData(data);
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
