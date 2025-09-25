import OtpInput from "react-otp-input";

const VerificationForm = ({
  employeeData,
  handleVerifyCode,
  isLoading,
  verificationCode,
  setVerificationCode,
  handleRetry,
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
            // separator={<span style={{ width: "8px" }}></span>}
            // isInputNum={true}
            shouldAutoFocus={true}
            renderInput={(props) => (
              <input
                {...props}
                className="w-12 h-12 p-2 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-[#ec3338] focus:outline-none mx-1"
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
