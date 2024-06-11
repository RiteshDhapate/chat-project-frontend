import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Otp = ({setOtp}) => {
 const handleOtpChange = (otp) => {
   // Check if OTP is complete (6 digits) and log it
   if (otp.length === 6) {
       setOtp(otp);
   } else {
       setOtp("");
   }
 };

  return (
    <InputOTP onChange={handleOtpChange} maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} className="text-black dark:text-white" />
        <InputOTPSlot index={1} className="text-black dark:text-white"/>
        <InputOTPSlot index={2} className="text-black dark:text-white"/>
        <InputOTPSlot index={3}className="text-black dark:text-white"/>
        <InputOTPSlot index={4} className="text-black dark:text-white"/>
        <InputOTPSlot index={5} className="text-black dark:text-white"/>
      </InputOTPGroup>
    </InputOTP>
  );
};

export default Otp;
