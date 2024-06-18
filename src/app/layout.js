import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { ShowHideProvider } from "@/utils/providers/sideBarToogleProvider";
import { SocketProvider } from "@/utils/context/socket";

export const metadata = {
  title: "SwiftTalk",
  description: "this is chatting appliaction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              shadow="27px 27px 55px #b7aeae,
            -27px -27px 55px #d7cccc"
              showSpinner={true}
              color="hsl(346.8 77.2% 49.8%)"
            />
            <ShowHideProvider>{children}</ShowHideProvider>
            <Toaster />
          </ThemeProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
