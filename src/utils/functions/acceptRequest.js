import axios from "axios";

export const acceptRequest = async (to, setError, route,toast) => {
  try {
    setError("");

    const token = localStorage.getItem("token");

    // validate
    if (!token) {
      toast({
        title: "please login first",
      });
        route.push("/login");
        return;
    } else if (!to) {
        setError("Please select user");
        return;
    }
    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/accept-request`, {
      token,
      to,
    });
      console.log(res)
      toast({
        title:"Request Accepted"
    })
  } catch (error) {
      console.log(error)
    setError(error?.response?.data?.message || "");
  }
};
