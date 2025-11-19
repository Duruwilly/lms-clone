import { getSidebarLinks } from "~/lib/sidebar-links";
import { NavLink } from "react-router";

const Sidebar = () => {
  //   const { user } = useUserStore();
  const user = { role: "admin", name: "John doe", profile_image: "" }; // dummy user object TODO: Replace later

  const userRole = user?.role ?? "";

  const roleMapping: Record<string, string> = {
    lecturer: "LECTURER_ROUTES",
    admin: "ADMIN_ROUTES",
    student: "STUDENTS_ROUTES",
  } as const;

  // type RouteGroups = Pick<
  //   typeof APP_ROUTES,
  //   "STUDENTS_ROUTES" | "ADMIN_ROUTES" | "LECTURER_ROUTES"
  // >;

  const roleProfileRoute = roleMapping[userRole as keyof typeof roleMapping];

  // const profileRoute =
  //   APP_ROUTES[roleProfileRoute as keyof RouteGroups].profile;

  const linksToShow = getSidebarLinks({
    routeType: roleProfileRoute,
    userRole,
  });

  return (
    <div className="h-screen bg-(--color-sidebar) flex flex-col sticky top-0 w-[20%] py-5 shadow-[4px_0_4px_4px_rgba(0,0,0,0.05)]">
      <div className="grow overflow-y-auto flex flex-col gap-[50px]">
        <div className="size-10 rounded-full bg-white mx-5 text-black text-[9.6px] font-bold flex justify-center items-center mt-5">
          Logo
        </div>
        <div className="flex flex-col gap-4 px-5">
          {linksToShow?.map((menu) => (
            <NavLink
              to={menu.path}
              key={menu.title}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 bg-primary-400 border-l-2 border-l-text-active rounded-lg py-2 px-4 pr-14 w-full text-base"
                  : "ml-4 flex items-center gap-2 py-2"
              }
            >
              <div className="">{menu.icon}</div>
              <span className="text-white text-sm font-semibold font-montserrat truncate overflow-hidden whitespace-nowrap w-[163px]">
                {menu.title}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Sidebar;
