// route details - show route info , safety rating and similar route

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import API from "../api/api"

function RouteDetail() {
  const { id } = useParams()
  const [route, setRoute] = useState(null)
  const [ratings, setRatings] = useState([])
  const [similarRoutes, setSimilarRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // rating form state
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState("")
  const [ratingLoading, setRatingLoading] = useState(false)
  const [ratingSuccess, setRatingSuccess] = useState("")
  const [ratingError, setRatingError] = useState("")

  //incident form state
  const [incidentType, setIncidentType] = useState("harassment")
  const [incidentDescription, setIncidentDescription] = useState("")
  const [incidentLoading, setIncidentLoading] = useState(false)
  const [incidentSuccess, setIncidentSuccess] = useState("")
  const [incidentError, setIncidentError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetching route details, ratings and similar routes simultaneously
        const [routeRes, ratingsRes, similarRes] = await Promise.all([
          API.get(`/routes/${id}`),
          API.get(`/ratings/${id}`),
          API.get(`/routes/${id}/similar`)
        ])
        setRoute(routeRes.data.data)
        setRatings(ratingsRes.data.data)
        setSimilarRoutes(similarRes.data.data)
      } catch (err) {
        setError("Failed to fetch route details")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  // submitting a safety rating
  const handleRatingSubmit = async (e) => {
    e.preventDefault()
    setRatingLoading(true)
    setRatingError("")
    setRatingSuccess("")
    try {
      await API.post("/ratings", { routeId: id, score, comment })
      setRatingSuccess("Rating submitted successfully!")
      setComment("")
      // refreshing ratings
      const ratingsRes = await API.get(`/ratings/${id}`)
      setRatings(ratingsRes.data.data)
    } catch (err) {
      setRatingError(err.response?.data?.message || "Failed to submit rating")
    } finally {
      setRatingLoading(false)
    }
  }

  // submitting an incident report
  const handleIncidentSubmit = async (e) => {
    e.preventDefault()
    setIncidentLoading(true)
    setIncidentError("")
    setIncidentSuccess("")
    try {
      await API.post("/incidents", {
        routeId: id,
        type: incidentType,
        description: incidentDescription
      })
      setIncidentSuccess("Incident reported successfully!")
      setIncidentDescription("")
    }
     catch (err) {
      setIncidentError(err.response?.data?.message || "Failed to report incident")
    } finally {
      setIncidentLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-purple-400 text-lg">Loading Route...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        {/* route info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 border border-purple-800 rounded-2xl p-6 mb-6"
        >
          <h1 className="text-2xl font-bold text-white mb-2">{route?.name}</h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <span>{route?.startPoint.name}</span>
            <span className="text-purple-400">→</span>
            <span>{route?.endPoint.name}</span>
          </div>
          <p className="text-gray-500 text-xs">Distance: {route?.distance} km</p>
        </motion.div>

        {/* similar routes - unique feature */}
        {similarRoutes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 border border-purple-800 rounded-2xl p-6 mb-6"
          >
            <h2 className="text-white font-semibold text-lg mb-4">
              🔍 Similar Safe Routes
            </h2>
            <div className="flex flex-col gap-3">
              {similarRoutes.map((r) => (
                <div key={r._id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-white text-sm font-medium">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.distance} km</p>
                  </div>
                  <span className="text-purple-400 text-sm font-semibold">
                    ⭐ {r.avgSafetyScore.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* submit rating form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-white font-semibold text-lg mb-4">Rate This Route</h2>

          {ratingSuccess && (
            <div className="bg-green-900/30 border border-green-500 text-green-400 text-sm rounded-lg px-4 py-3 mb-4">
              {ratingSuccess}
            </div>
          )}
          {ratingError && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {ratingError}
            </div>
          )}

          <form onSubmit={handleRatingSubmit} className="flex flex-col gap-4">
            {/* score selector */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Safety Score</label>
              <select
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value={5}>⭐⭐⭐⭐⭐ - Very Safe</option>
                <option value={4}>⭐⭐⭐⭐ - Safe</option>
                <option value={3}>⭐⭐⭐ - Moderate</option>
                <option value={2}>⭐⭐ - Unsafe</option>
                <option value={1}>⭐ - Very Unsafe</option>
              </select>
            </div>

            {/* comment */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Comment (optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={3}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={ratingLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-3 transition-colors cursor-pointer disabled:opacity-50"
            >
              {ratingLoading ? "Submitting..." : "Submit Rating"}
            </motion.button>
          </form>
        </motion.div>

        {/*incident report form */}
        <motion.div
         initial={{opacity:0, y:20}}
         animate={{opacity:1, y:0}}
         transition={{delay:0.3}}
         className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6"
         >
         <h2 className="text-white font-semibold text-lg mb-4">
          Report Unsafe Situation</h2>  

          {incidentSuccess && (
            <div className="bg-green-900/30 border border-green-500 text-green-400 text-sm rounded-lg px-4 py-3 mb-4">
              {incidentSuccess}
            </div>
          )}
          {incidentError && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {incidentError}
            </div>
          )}

          <form onSubmit={handleIncidentSubmit} className="flex flex-col gap-4">
            {/* incident type */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Incident Type</label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="harassment">Harassment</option>
                  <option value="accident">Accident</option>
                  <option value="breakdown">Breakdown</option>
                  <option value="unsafe_stop">Unsafe Stop</option>
                  <option value="other">Other</option>
                </select>
            </div>

            {/* incident description */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Description</label>
              <textarea
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                placeholder="Describe the unsafe situation..."
                rows={3}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
            </div>
            
            <motion.button
              whileHover={{scale:1.02}}
              whileTap={{scale:0.98}}
              type="submit"
              disabled={incidentLoading}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-3 transition-colors cursor-pointer disabled:opacity-50"
              >
                {incidentLoading ? "Reporting...": "Report Incident"}
              </motion.button>
          </form>
        </motion.div>

        {/* ratings list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-white font-semibold text-lg mb-4">
            Community Ratings ({ratings.length})
          </h2>

          {ratings.length === 0 ? (
            <p className="text-gray-500 text-sm">No ratings yet. Be the first to rate!</p>
          ) : (
            <div className="flex flex-col gap-3">
              {ratings.map((rating) => (
                <div key={rating._id} className="bg-gray-800 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-purple-400 text-sm font-medium">
                      {rating.userId?.name || "Anonymous"}
                    </span>
                    <span className="text-yellow-400 text-sm">
                      {"⭐".repeat(rating.score)}
                    </span>
                  </div>
                  {rating.comment && (
                    <p className="text-gray-400 text-xs">{rating.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default RouteDetail