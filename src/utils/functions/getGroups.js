import axios from "axios";

export const getAllGroups = async (setGroups, setError, route) => {
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
    const res = await axios.post(`${serverUrl}/get-all-groups`, {
      token,
    });
    const data = res.data.data;
    console.log(data);
    setGroups(data);
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
