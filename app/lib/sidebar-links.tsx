import BarChartIcon from "~/assets/svg/icons/bar-chart-icon";
import BookClosedIcon from "~/assets/svg/icons/book-closed-icon";
import DashboardIcon from "~/assets/svg/icons/dashboard-icons";
import SettingsIcon from "~/assets/svg/icons/settings-icon";
import UserIcon from "~/assets/svg/icons/user-icon";
import UsersIcon from "~/assets/svg/icons/users-icon";
import { APP_ROUTES } from "~/lib/constants/app-routes";

export type SidebarLink = {
  path: string;
  icon: React.ReactNode;
  title: string;
  roles?: string[];
  categories?: string[];
};

export const SidebarLinks: Record<string, SidebarLink[]> = {
  STUDENTS_ROUTES: [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      path: APP_ROUTES.STUDENTS_ROUTES.dashboard,
      roles: ["lecturer", "student"],
    },
  ],

  ADMIN_ROUTES: [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      path: APP_ROUTES.ADMIN_ROUTES.dashboard,
      roles: ["superadmin", "admin", "support"],
    },
    {
      icon: <UsersIcon />,
      title: "Students",
      path: APP_ROUTES.ADMIN_ROUTES.students,
      roles: ["superadmin", "admin", "support"],
    },
    {
      icon: <UserIcon />,
      title: "Lecturers",
      path: APP_ROUTES.ADMIN_ROUTES.lecturers,
      roles: ["superadmin", "admin", "support"],
    },
    {
      icon: <BookClosedIcon />,
      title: "Courses",
      path: APP_ROUTES.ADMIN_ROUTES.courses,
      roles: ["superadmin", "admin", "support"],
    },
    {
      icon: <UserIcon />,
      title: "User Management",
      path: APP_ROUTES.ADMIN_ROUTES.user_management,
      roles: ["superadmin", "admin", "support"],
    },
    {
      icon: <BarChartIcon />,
      title: "Reports & Analytics",
      path: APP_ROUTES.ADMIN_ROUTES.report,
      roles: ["superadmin", "admin", "support"],
    },
    {
      icon: <SettingsIcon />,
      title: "Settings",
      path: APP_ROUTES.ADMIN_ROUTES.settings,
      roles: ["superadmin", "admin", "support"],
    },
  ],

  LECTURER_ROUTES: [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      path: APP_ROUTES.LECTURER_ROUTES.dashboard,
      roles: ["superadmin", "admin", "lecturer"],
    },
  ],
};

export const getSidebarLinks = ({
  routeType,
  userRole,
}: {
  routeType: keyof typeof SidebarLinks;
  userRole?: string;
  businessCategory?: string;
}) => {
  return SidebarLinks[routeType]?.filter((link) => {
    const roleMatch = !link?.roles || link?.roles?.includes(userRole ?? "");
    return roleMatch;
  });
};
