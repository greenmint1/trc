import { createContext } from "react";

export type SideMenuContextValue = {
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
};

export const SideMenuContext = createContext<SideMenuContextValue | undefined>(
  undefined,
);
