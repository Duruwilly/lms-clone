import { Navigate, Outlet } from "react-router";
import Spinner from "~/components/general/spinner";
import { APP_ROUTES } from "~/lib/constants/app-routes";
// import { useUserStore } from "~/store/user-store";

interface ProtectedRouteProps {
  requiredRoles: string[];
}

const ProtectedRoute = ({ requiredRoles }: ProtectedRouteProps) => {
  // const { user } = useUserStore();

  const user = { role: "admin" };
  // const user = false;

  if (!user || !user?.role) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const hasAccess = requiredRoles.includes(user?.role);
  if (!hasAccess) return <Navigate to={APP_ROUTES.unauthorized} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
