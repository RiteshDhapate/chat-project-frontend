import { TypewriterEffect } from "@/components/ui/ui/Typewriter-effect";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const AuthNavbar = () => {
  return (
    <>
      <Link href="/">
      <motion.div
        initial={{
          scale: 0,
        }}
        whileInView={{
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="md:w-[70px] md:h-[70px] bg-[#f5ebe0] dark:bg-[#343a40] rounded-full flex justify-center items-center"
      >
        <motion.div
          initial={{
            scale: 0,
          }}
          whileInView={{
            scale: 1,
          }}
          transition={{
            duration: 0.2,
            delay: 0.2,
          }}
          className="w-[50px] h-[50px] rounded-full bg-[#d5bdaf] dark:bg-[#4a4e69] flex justify-center items-center"
        >
          <Image src="/logo.png" width={100} height={100} alt="logo" />
        </motion.div>
      </motion.div>
          </Link>
      <h1 className="text-2xl font-semibold text-primary">
        <TypewriterEffect
          className="text-2xl"
          words={[{ text: "SwiftTalk" }]}
        />
      </h1>
    </>
  );
};

export default AuthNavbar;
