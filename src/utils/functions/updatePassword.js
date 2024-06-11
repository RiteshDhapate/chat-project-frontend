import axios from "axios";
import { isValidEmail } from "./registerUser";

export const updatePassword = async (password, setError, toast, route) => {
  try {
      setError("");
      const token = localStorage.getItem("token");
    // validate
    if (!password) {
      setError("Please enter password address");
      return;
    } else if (password< 7) {
      setError("password at least 7 characters");
      return;
      } if (!token) {
        setError("Please login first");
    }

    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/update-password`, {
        password,
        token
    });
    toast({
      title: "password updated",
    });
    route.push("/");
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
