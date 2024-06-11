import axios from "axios";

export const getAllGroupsJoin = async (setUsers, setError, route) => {
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
    const res = await axios.post(`${serverUrl}/get-all-groups-join`, {
      token,
    });
      const data = res.data.data;
      console.log(data)
    setUsers(data);
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
