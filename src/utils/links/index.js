import {
  BadgePlus,
  CheckCheck,
  Group,
  Send,
  Settings,
  User,
  SquarePen,
} from "lucide-react";

export const links = [
  {
    logo: <User />,
    name: "Frends",
    href: "/",
  },
  {
    logo: <Group />,
    name: "Groups",
    href: "/groups",
  },
  {
    logo: <CheckCheck />,
    name: "Requests",
    href: "/requests",
  },
  {
    logo: <Send />,
    name: "Send Requests",
    href: "/send-requests",
  },
  {
    logo: <BadgePlus />,
    name: "Join Group",
    href: "/join-group",
  },
  {
    logo: <SquarePen />,
    name: "Create Group",
    href: "/create-group",
  },
  // {
  //   logo: <Settings />,
  //   name: "Settings",
  //   href: "/settings",
  // },
];
