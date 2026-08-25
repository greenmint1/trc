import { SideMenuContext } from "@src/context/sideMenuContext";
import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export function SideMenuProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [sideMenuPathname, setSideMenuPathname] = useState<string | null>(null);

  const isSideMenuOpen = sideMenuPathname === location.pathname;

  const openSideMenu = () => {
    setSideMenuPathname(location.pathname);
  };

  const closeSideMenu = () => {
    setSideMenuPathname(null);
  };

  return (
    <SideMenuContext value={{ isSideMenuOpen, openSideMenu, closeSideMenu }}>
      {children}
    </SideMenuContext>
  );
}
