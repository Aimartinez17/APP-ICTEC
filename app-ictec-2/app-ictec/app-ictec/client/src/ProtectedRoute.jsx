import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth();
    console.log(loading, isAuthenticated);

    if (loading) return <h1>
        Loading...
    </h1>;
    if (!loading && !isAuthenticated) return <Navigate to='/' replace />;
    return(<Outlet/>);
}
export default ProtectedRoute;