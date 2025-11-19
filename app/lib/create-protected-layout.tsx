import ProtectedRoute from "~/hoc/role-access";

export default function createProtectedLayout(requiredRoles: string[]) {
  return function ProtectedLayout() {
    return <ProtectedRoute requiredRoles={requiredRoles} />;
  };
}
