import axios from "axios";

export const joinGroup = async (to, setError, toast, route) => {
  try {
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Please login first",
      });
      route.push("/login");
      return;
    }

    if (!to) {
      toast({
        title: "Please select Group",
      });
      return;
    }
    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/join-group`, {
      token,
     groupId: to,
    });
    console.log(res);
    toast({
      title: "Group join successfully",
    });
  } catch (error) {
    console.log(error);
    setError(error?.response?.data?.message || "");
    if (error?.response?.data?.message === "Request has already been sent.") {
      toast({
        title: "Request has already been sent.",
      });
    }
  }
};
