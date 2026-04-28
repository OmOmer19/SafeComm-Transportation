// admin dashboard - shows stats, charts and incident management
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import Navbar from "../components/Navbar";
import API from "../api/api";

// colors for pie chart
const COLORS = ["#7c3aed", "#a855f7", "#c084fc", "#e879f9", "#f0abfc"]

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [ratingsPerRoute, setRatingsPerRoute] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // fetching admin stats and ratings per route
    const fetchData = async () => {
      try {
        const [statsRes, ratingsRes] = await Promise.all([
          API.get("/admin/stats"),
          API.get("/admin/ratings-per-route")
        ])
        setStats(statsRes.data.data)
        setRatingsPerRoute(ratingsRes.data.data)
      } catch (err) {
        setError("Failed to fetch dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-purple-400 text-lg">Loading Dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        {/* heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Monitor safety ratings and incidents</p>
        </div>

        {/* error message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Routes", value: stats?.totalRoutes, color: "text-purple-400" },
            { label: "Total Ratings", value: stats?.totalRatings, color: "text-blue-400" },
            { label: "Total Incidents", value: stats?.totalIncidents, color: "text-red-400" },
            { label: "Avg Safety Score", value: stats?.avgSafetyScore, color: "text-green-400" },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <p className="text-gray-400 text-sm mb-2">{card.label}</p>
              <p className={`text-3xl font-bold ${card.color}`}>{card.value || 0}</p>
            </motion.div>
          ))}
        </div>

        {/* charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* bar chart - ratings per route */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <h2 className="text-white font-semibold mb-4">Avg Safety Score Per Route</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ratingsPerRoute}>
                <XAxis dataKey="routeName" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis domain={[0, 5]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#13131a", border: "1px solid #2d2d3d", borderRadius: "8px" }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey="avgScore" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* pie chart - incidents by type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <h2 className="text-white font-semibold mb-4">Incidents By Type</h2>
            {stats?.incidentsByType?.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.incidentsByType}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ _id, count }) => `${_id}: ${count}`}
                  >
                    {stats.incidentsByType.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#13131a", border: "1px solid #2d2d3d", borderRadius: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-sm">No incidents reported yet</p>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard