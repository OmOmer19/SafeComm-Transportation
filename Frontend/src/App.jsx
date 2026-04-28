import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import RoutesPage from "./pages/Routes"
import RouteDetail from "./pages/RouteDetail"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected user routes */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/routes" element={<ProtectedRoute><RoutesPage /></ProtectedRoute>} />
      <Route path="/routes/:id" element={<ProtectedRoute><RouteDetail /></ProtectedRoute>} />

      {/*protected  admin routes */}
      <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App