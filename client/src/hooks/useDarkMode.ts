import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("password-analyzer-theme") as Theme) || "system"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
    
    localStorage.setItem("password-analyzer-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
