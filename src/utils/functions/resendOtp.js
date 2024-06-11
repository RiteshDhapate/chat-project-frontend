import axios from "axios";
import { isValidEmail } from "./registerUser";

export const resendOtp = async (setError,toast) => {
  try {
    setError("");
    
      const token = localStorage.getItem("token");
      if (!token) {
          setError("Please login first");
          return;
      }

    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/resend-email`, {
      token,
    });
    toast({
      title: "Otp Sent Successfully",
    });
    localStorage.setItem("OData", res.data.data.otp);
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
