import { useThemeStore } from "~/store/theme-store";

const AdminDashboard = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-md px-3 py-1 text-sm font-medium"
        >
          Toggle Theme
        </button>

        {/* Optional: Explicit selector instead of toggle */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className="rounded-md border px-2 py-1 text-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  );
};

export default AdminDashboard;
