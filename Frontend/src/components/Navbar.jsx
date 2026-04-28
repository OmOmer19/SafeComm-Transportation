import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate()

  // getting user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"))

  // logout function - clears localStorage and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 border-b border-purple-900 px-6 py-4 flex items-center justify-between"
    >
      {/* logo */}
      <Link to="/" className="text-xl font-bold text-white">
        Safe<span className="text-purple-400">Comm</span>
      </Link>

      {/* nav links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
        >
          Map
        </Link>
        <Link
          to="/routes"
          className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
        >
          Routes
        </Link>

        {/* show admin link only if user is admin */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* user info and logout */}
      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">
          Hi, <span className="text-purple-400">{user?.name}</span>
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  )
}

export default Navbar