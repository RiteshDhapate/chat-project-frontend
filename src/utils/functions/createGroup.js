import axios from "axios";

export const createGroup = async (
  userName,
  about,
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
        setError("Please enter about your self");
        return;
    } else if (!profileImage) {
        setError("Please select profile image");
        return;
    } 
    if (!token) {
        setError("Please login first");
        return; 
    }

    console.log("route call")
    // route call
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await axios.post(`${serverUrl}/create-group`, {
      groupName: userName,
      about,
      profileImage,
      token,
    });
    toast({
      title: "Group created successfully",
    });
    console.log(res);
    route.push("/");
  } catch (error) {
    setError(error?.response?.data?.message || "");
  }
};
