import axios from "axios";

export const getMessages = async (setMessages,chatId, chatType, setError, route) => {
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

    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/get-messages`, {
      token,
      chatId,
      chatType,
    });
    const data = res.data.data;
    setMessages(data);
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
