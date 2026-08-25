import { ThemeContext } from "@src/context/themeContext";
import { useEffect, useState, type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("trc-theme");
    return storedTheme ? storedTheme === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("trc-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext value={{ isDark, toggleTheme }}>{children}</ThemeContext>
  );
}
