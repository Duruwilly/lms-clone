// FILE IS OBSOLETE. TO BE REMOVED LATER

import { useEffect } from "react";
import { useThemeStore } from "~/store/theme-store";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
};
