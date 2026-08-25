import { SideMenuContext } from "@src/context/sideMenuContext";
import { useContext } from "react";

export function useSideMenu() {
  const context = useContext(SideMenuContext);

  if (!context) {
    throw new Error("useSideMenu must be used within SideMenuProvider");
  }

  return context;
}
