import SideBar from "@/components/SideBar";

const layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex ">
      <SideBar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
