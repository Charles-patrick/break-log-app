import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";

const VerificationForm = ({
  employeeData,
  handleVerifyCode,
  isLoading,
  verificationCode,
  setVerificationCode,
  handleRetry,
  isVerifying,
}) => {
  const [time, setTime] = useState(120);

  useEffect(() => {
    if (time <= 0) return;
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [time > 0]);

  const handleResend = async (e) => {
    await handleRetry(e);
    setTime(120);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Email Verification
      </h1>
      <p className="text-center mb-4">
        Please enter the verification code sent to {employeeData.email}.
      </p>
      <form onSubmit={handleVerifyCode} className="space-y-6">
        <div className="flex justify-center">
          <OtpInput
            value={verificationCode}
            onChange={setVerificationCode}
            numInputs={6}
            shouldAutoFocus={true}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: "clamp(30px, 10vw, 50px)",
                  height: "clamp(35px, 12vw, 60px)",
                  fontSize: "clamp(14px, 4vw, 24px)",
                  margin: "0 0.2rem",
                  textAlign: "center",
                  border: "2px solid #d1d5db",
                  borderRadius: "0.5rem",
                }}
                className="focus:border-[#ec3338] focus:outline-none"
                disabled={isLoading}
              />
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isVerifying || verificationCode.length !== 6}
          className="w-full bg-[#ec3338] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#dc2626] transition-colors duration-200 disabled:bg-[#f8b4b4] disabled:cursor-not-allowed"
        >
          {isVerifying ? "VERIFYING..." : "VERIFY"}
        </button>
      </form>

      <div className="text-center mt-4 text-gray-600">
        Code not delivered?{" "}
        {time <= 0 ? (
          <button
            onClick={handleResend}
            className="text-[#ec3338] hover:underline font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Resending..." : "Resend Verification Code"}
          </button>
        ) : (
          <span>
            Retry in {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        )}
      </div>
    </>
  );
};

export default VerificationForm;
