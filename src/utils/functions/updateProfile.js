import axios from "axios";

export const updateProfile = async (
  userName,
  about,
  age,
  profileImage,
  setError,
  toast,
  route
) => {
  try {
    setError("");
    const token = localStorage.getItem("token");
    // validate
    if (!userName) {
      setError("Please enter User Name");
      return;
    } else if (!about) {
      setError("Please enter about your self")
      return;
    } else if (!profileImage) {
      setError("Please select profile image");
      return;
    } else if (!age) {
      setError("Please select age");
      return;
    } else if (age < 1) {
      setError("Please enter1 age");
      return;
    }
    if (!token) {
      setError("Please login first");
      return;
    }

    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/update-profile`, {
      userName,
      age,
      about,
      profileImage,
      token,
    });
    toast({
      title: "Profile updated",
    });
      console.log(res)
    route.push("/");
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
