import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";

const VerificationForm = ({
  employeeData,
  handleVerifyCode,
  isLoading,
  verificationCode,
  setVerificationCode,
  handleRetry,
  setIsVerificationPage,
}) => {
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
                  width: 'clamp(30px, 10vw, 50px)',
                  height: 'clamp(35px, 12vw, 60px)',
                  fontSize: 'clamp(14px, 4vw, 24px)',
                  margin: '0 0.2rem',
                  textAlign: 'center',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                }}
                className="focus:border-[#ec3338] focus:outline-none"
                disabled={isLoading}
              />
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || verificationCode.length !== 6}
          className="w-full bg-[#ec3338] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#dc2626] transition-colors duration-200 disabled:bg-[#f8b4b4] disabled:cursor-not-allowed"
        >
          {isLoading ? "VERIFYING..." : "VERIFY"}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Code not delivered?{" "}
        <button
          onClick={handleRetry}
          className="text-[#ec3338] hover:underline font-medium"
        >
          Resend verification code
        </button>
      </p>
    </>
  );
};

export default VerificationForm;
