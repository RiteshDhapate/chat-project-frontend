import axios from "axios";
import { isValidEmail } from "./registerUser";

export const LoginUser = async (email, password, setError, toast, route) => {
  try {
    setError("");
    // validate
    if (!email) {
      setError("Please enter email address");
      return;
    } else if (!password) {
      setError("Please enter password");
      return;
    } else if (!isValidEmail(email)) {
      setError("Email is not valid");
      return;
    } else if (password.length < 7) {
      setError("Password must be at least 7 characters");
      return;
    }

    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/login`, {
      email,
      password,
    });
    toast({
      title: "Login Successfully...",
    });
    localStorage.setItem("token", res.data.data.token);
    console.log(res.data.data);
    if (res.data.data.isTwoFactorEnabled) {
      localStorage.setItem("OData", res.data.data.otp);
      route.push("/otp-verification?type=twoFactor");
    } else {
      route.push("/");
    }
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
