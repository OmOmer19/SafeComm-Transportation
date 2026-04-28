import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import API from "../api/api"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // updating form fields on change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      // calling login API
      const res = await API.post("/auth/login", formData)
      // saving token and user data in localStorage
      localStorage.setItem("token", res.data.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.data))
      // redirecting to home page
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      {/* login card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 border border-purple-800 rounded-2xl p-8 w-full max-w-md shadow-lg shadow-purple-900/20"
      >
        {/* heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Login to SafeComm Transportation</p>
        </div>

        {/* error message */}
        {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                {error}
            </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* email field */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* password field */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* submit button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-3 mt-2 transition-colors cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* register link */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login