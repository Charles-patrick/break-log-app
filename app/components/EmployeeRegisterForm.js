const EmployeeRegisterForm = ({
    employeeData,
    handleEmployeeChange,
    handleEmployeeRegister,
    isLoading, 
    confirmPassword,
    setConfirmPassword
}) => {
    return(
        <form onSubmit={handleEmployeeRegister} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ec3338] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={employeeData.name}
                onChange={handleEmployeeChange}
                disabled={isLoading}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Company Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ec3338] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={employeeData.email}
                onChange={handleEmployeeChange}
                disabled={isLoading}
                required
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ec3338] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ec3338] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#dc2626] transition-colors duration-200 disabled:bg-[#f8b4b4] disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
                {isLoading ? "REGISTERING..." : "REGISTER"}
            </button>
            </form>
    )
}
export default EmployeeRegisterForm