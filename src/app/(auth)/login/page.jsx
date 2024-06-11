"use client";
import AuthNavbar from "@/components/AuthNavbar";
import { useToast } from "@/components/ui/use-toast";
import { LoginUser } from "@/utils/functions/loginUser";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loding, setLoding] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  // handle login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    await LoginUser(email, password, setError, toast, route);
    setLoding(false);
  };

  // render Jsx
  return (
    <div className="w-screen h-screen">
      <div className="container w-full h-[10vh] flex gap-5  items-center">
        <AuthNavbar />
      </div>
      <div className="w-full h-[90vh] flex justify-center md:items-center">
        <div className=" text-white tilt-in-fwd-tr flex flex-col items-center pt-16 sm:justify-center sm:pt-0">
          <div className="relative mt-12 w-full max-w-lg sm:mt-10">
            <div
              className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
              bis_skin_checked="1"
            ></div>
            <div className="mx-5 border  sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 rounded-lg border-white/20 border-l-white/20 border-r-white/20 dark:sm:shadow-sm dark:lg:rounded-xl ">
              <div className="flex flex-col p-6">
                <h3 className="text-xl font-semibold leading-6 text-black dark:text-white tracking-tighter">
                  Login
                </h3>
                <p className="mt-1.5 text-sm font-medium text-black/50 dark:text-white/50">
                  Welcome back, enter your credentials to continue..
                </p>
              </div>
              <div className="p-6 pt-0">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <div>
                      <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground dark:group-focus-within:text-white text-gray-400">
                            Username
                          </label>
                        </div>
                        <input
                          type="email"
                          name="username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          autoComplete="off"
                          className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground dark:group-focus-within:text-white text-gray-400">
                            Password
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="remember"
                        className="outline-none focus:outline focus:outline-sky-300"
                      />
                      <span className="text-xs text-black dark:text-white">
                        Remember me
                      </span>
                    </label>
                    <Link
                      className="text-sm font-medium text-blue-500 underline"
                      href="/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-x-2">
                    <Link
                      className="inline-flex items-center justify-center text-black dark:text-white rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                      href="/register"
                    >
                      Register
                    </Link>
                    <button
                      className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                      type="submit"
                    >
                      {loding ? <Loader className="animate-spin" /> : "Log In"}
                    </button>
                  </div>
                  <div className="text-red-900">{error}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
