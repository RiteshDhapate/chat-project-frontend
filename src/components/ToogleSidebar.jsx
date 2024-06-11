import { useShowHideContext } from "@/utils/providers/sideBarToogleProvider";
import { AlignJustify } from "lucide-react";

const ToogleSidebar = () => {
  const { setShowHide } = useShowHideContext();

  return <AlignJustify onClick={() => setShowHide((prev) => !prev)} />;
};

export default ToogleSidebar;
