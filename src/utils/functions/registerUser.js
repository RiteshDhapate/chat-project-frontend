import axios from "axios";

export function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const registerUser = async (
  email,
  password,
  confirmPassword,
  setError,
  toast,
  route
) => {
  try {
    setError("");
    // validate
    if (!email) {
      setError("Please enter email address");
      return;
    } else if (!password) {
      setError("Please enter password");
      return;
    } else if (!confirmPassword) {
      setError("please enter confirm password");
      return;
    } else if (password !== confirmPassword) {
      setError("Both password not match");
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
    const res = await axios.post(`${serverUrl}/register`, {
      email,
      password,
    }); 
       toast({
         title: "Register Successfully..."
       });
      localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("OData", res.data.data.otp);
    route.push("/otp-verification?type=verification");
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
