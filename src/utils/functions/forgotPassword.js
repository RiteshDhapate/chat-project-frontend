import axios from "axios";
import { isValidEmail } from "./registerUser";

export const forgotPassword = async (email, setError, toast,route) => {
  try {
    setError("");
    // validate
      if (!email) {
          setError("Please enter email address");
          return;
      } else if (!isValidEmail(email)) { 
          setError("Please enter email valid address");
          return;
      }

    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/forgot-password`, {
      email
    });
    toast({
      title: "Otp Sent Successfully",
    });
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("OData", res.data.data.otp);
      route.push("/otp-verification?type=forgot");
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
