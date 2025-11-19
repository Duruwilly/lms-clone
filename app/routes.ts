import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";
import { APP_ROUTES } from "./lib/constants/app-routes";

export default [
  layout("routes/auth/layout.tsx", [
    index("routes/auth/login/index.tsx"),
    route(APP_ROUTES.verify_otp, "routes/auth/verify-otp/index.tsx"),
    route(APP_ROUTES.forgot_password, "routes/auth/forgot-password/index.tsx"),
    route(APP_ROUTES.reset_password, "routes/auth/reset-password/index.tsx"),
    route(APP_ROUTES.set_password, "routes/auth/set-password/index.tsx"),
  ]),

  layout("routes/required-auth/layout.tsx", [
    // admin role layout
    layout("lib/admin-role-layout.tsx", [
      route(
        APP_ROUTES.ADMIN_ROUTES.dashboard,
        "routes/required-auth/admin/dashboard/index.tsx",
      ),
    ]),

    // student role layout
    layout("lib/student-role-layout.tsx", [
      route(
        APP_ROUTES.STUDENTS_ROUTES.dashboard,
        "routes/required-auth/students/dashboard/index.tsx",
      ),
    ]),

    // lecturer role layout
    layout("lib/lecturer-role-layout.tsx", [
      route(
        APP_ROUTES.LECTURER_ROUTES.dashboard,
        "routes/required-auth/lecturers/dashboard/index.tsx",
      ),
    ]),
  ]),
] satisfies RouteConfig;
