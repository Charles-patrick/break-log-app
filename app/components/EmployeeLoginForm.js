const EmployeeLoginForm = ({ 
  handleEmployeeLogin, 
  isLoading, 
  employeeData, 
  handleEmployeeChange 
}) => {
  return (
    <form onSubmit={handleEmployeeLogin} className="space-y-4">
      <input
        type="text"
        name="idCard"
        placeholder="ID Card Number"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ec3338] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        value={employeeData.idCard}
        onChange={handleEmployeeChange}
        disabled={isLoading}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ec3338] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        value={employeeData.password}
        onChange={handleEmployeeChange}
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#ec3338] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#dc2626] transition-colors duration-200 disabled:bg-[#f8b4b4] disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {isLoading ? "LOGGING IN..." : "LOGIN"}
      </button>
    </form>
  );
};

export default EmployeeLoginForm;