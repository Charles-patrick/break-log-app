const AdminLoginForm = ({ handleAdminSubmit , isLoading, adminId, setAdminId, adminPassword, setAdminPassword }) => {
    return(
        <form onSubmit={handleAdminSubmit} className="space-y-6">
            <input
                type="text"
                placeholder="Admin ID"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ec3338] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                disabled={isLoading}
                required
            />
            <input
                type="password"
                placeholder="Enter admin password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ec3338] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
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
    )
}
export default AdminLoginForm;