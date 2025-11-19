import { create } from "zustand";

export type Theme = "light" | "dark" | "system";
type EffectiveTheme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  effectiveTheme: EffectiveTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  // helper to compute actual theme
  const getEffectiveTheme = (theme: Theme): EffectiveTheme => {
    if (theme === "system") {
      if (typeof window === "undefined") return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  };

  // initial theme
  const initialTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as Theme) || "system"
      : "system";
  const initialEffectiveTheme = getEffectiveTheme(initialTheme);

  // apply theme immediately (avoid FOUC)
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", initialEffectiveTheme);

    // listen for system preference changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (get().theme === "system") {
          set({ effectiveTheme: e.matches ? "dark" : "light" });
          document.documentElement.setAttribute(
            "data-theme",
            e.matches ? "dark" : "light",
          );
        }
      });
  }

  return {
    theme: initialTheme,
    effectiveTheme: initialEffectiveTheme,
    setTheme: (theme: Theme) => {
      const effective = getEffectiveTheme(theme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", effective);
      }
      set({ theme, effectiveTheme: effective });
    },
    toggleTheme: () => {
      const next =
        get().theme === "light"
          ? "dark"
          : get().theme === "dark"
            ? "system"
            : "light";
      get().setTheme(next);
    },
  };
});
