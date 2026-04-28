// routes page  to show all transit routes with safety scores

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../api/api"

function RoutesPage(){
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // fetching all routes from backend
    const fetchRoutes = async () => {
      try {
        const res = await API.get("/routes")
        setRoutes(res.data.data)
      } catch (err) {
        setError("Failed to fetch routes")
      } finally {
        setLoading(false)
      }
    }
    fetchRoutes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-purple-400 text-lg">Loading Routes...</p>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Transit Routes</h1>
          <p className="text-gray-400 text-sm">Select a route to view safety details</p>
        </div>

        {/* error message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* routes list */}
        <div className="flex flex-col gap-4">
          {routes.map((route, index) => (
            <motion.div
              key={route._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/routes/${route._id}`)}
              className="bg-gray-900 border border-gray-800 hover:border-purple-700 rounded-2xl p-6 cursor-pointer transition-colors"
            >
              {/* route name */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-semibold text-lg">{route.name}</h2>
                {/* safety score badge */}
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  route.avgSafetyScore >= 4 ? "bg-green-900/40 text-green-400" :
                  route.avgSafetyScore >= 3 ? "bg-yellow-900/40 text-yellow-400" :
                  route.avgSafetyScore > 0 ? "bg-red-900/40 text-red-400" :
                  "bg-gray-800 text-gray-400"
                }`}>
                  {route.avgSafetyScore > 0 ? `⭐ ${route.avgSafetyScore.toFixed(1)}` : "Not Rated"}
                </span>
              </div>

              {/* route details */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{route.startPoint.name}</span>
                <span className="text-purple-400">→</span>
                <span>{route.endPoint.name}</span>
              </div>

              {/* distance */}
              <div className="mt-3 text-gray-500 text-xs">
                Distance: {route.distance} km
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default RoutesPage