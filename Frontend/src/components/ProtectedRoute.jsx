// this component protects routes from unauthenticated users - redirects
// to login if no token

import { Navigate } from "react-router-dom";

function ProtectedRoute({children, adminOnly= false}){
    //getting user data from local storage
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    //if no token , redirecting to login
    if(!token){
        return <Navigate to="/login" />
    }
    // if admin only route and user is not admin then redirecting to home
    if(adminOnly && user?.role !== "admin"){
        return <Navigate to="/" />
    }
    // if authenticated then rendering the page
    return children
}
export default ProtectedRoute