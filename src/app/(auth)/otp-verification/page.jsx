"use client";
import AuthNavbar from "@/components/AuthNavbar";
import Otp from "@/components/Otp";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { otpVerification } from "@/utils/functions/otpVerification";
import { resendOtp } from "@/utils/functions/resendOtp";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  // states
  const [otp, setOtp] = useState();
  const [error, setError] = useState("");
  const [loding, setLoding] = useState(false);
  const [reSendLoding, setReSendLoding] = useState(false);
  const { toast } = useToast();
  const route = useRouter();
  const queryParams = useSearchParams();

  // handle login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    const storedOtp = localStorage.getItem("OData");
    const queryType = queryParams.get("type");


    // checks
    if (!storedOtp) {
      toast({
        title: "OTP is expired. please click on resend otp !",
      });
    } else if (storedOtp !== otp) {
      toast({
        title: "OTP not match !",
      });
    }

    await otpVerification(otp, queryType, setError, toast, route);

    setLoding(false);
  };

  // handle resend otp event
  const handleResendOtp = async () => {
    setReSendLoding(true);
    await resendOtp(setError,toast);
    setReSendLoding(false);
  }


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      route.push("/login");
    }
  }, []);

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
                  OTP Verification
                </h3>
                <p className="mt-1.5 text-sm font-medium text-black/50 dark:text-white/50">
                  Welcome back, enter your credentials to continue..
                </p>
              </div>
              <div className="p-6 pt-0">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <div className="w-full flex justify-center items-center">
                      <Otp setOtp={setOtp}/>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-x-2">
                    <Button
                      onClick={handleResendOtp}
                      className="cursor-pointer"
                      asChild
                    >
                      {reSendLoding ? (
                        <p>
                          <Loader className="animate-spin" />
                        </p>
                      ) : (
                        <p>Resend OTP</p>
                      )}
                    </Button>
                    <button
                      className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                      type="submit"
                    >
                      {loding ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Verify OTP"
                      )}
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
