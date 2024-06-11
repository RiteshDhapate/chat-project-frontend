import axios from "axios";

export const getAllUsersAcceptRequest = async (setUsers, setError, route) => {
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
    const res = await axios.post(`${serverUrl}/get-all-users-accept-requests`, {
      token,
    });
    const data = res.data.data;
    setUsers(data);
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
