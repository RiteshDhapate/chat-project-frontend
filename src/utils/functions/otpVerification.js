import axios from "axios";

export const otpVerification = async (otp, type, setError, toast, route) => {
  try {
    setError("");

    const token = localStorage.getItem("token");
    const storedOtp = localStorage.getItem("OData");

    // validate
    if (!otp) {
      toast({
        title: "please enter otp",
      });
    } else if (!token) {
      toast({
        title: "please login first",
      });
    } else if (otp !== storedOtp) {
      toast({
        title: "otp Not match",
      });
    }

    //   types
    if (type === "verification") {
      // route call
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const res = await axios.post(`${serverUrl}/verify-user`, {
        token,
      });
      toast({
        title: "verification successful",
      });
      route.push("/update-profile");
    } else if (type === "twoFactor") {
      route.push("/");
    } else if (type === "forgot") {
      route.push("/update-password");
    } else {
      toast({
        title: "Unknown query",
      });
    }
      
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
