"use client";

import { createContext, useContext, ReactNode } from "react";

interface ShowLayoutContextProps {
  showLayout: boolean;
}

const ShowLayoutContext = createContext<ShowLayoutContextProps | undefined>(
  undefined
);

export const ShowLayoutProvider = ({
  children,
  showLayout,
}: {
  children: ReactNode;
  showLayout: boolean;
}) => (
  <ShowLayoutContext.Provider value={{ showLayout }}>
    {children}
  </ShowLayoutContext.Provider>
);

export const useShowLayout = () => {
  const context = useContext(ShowLayoutContext);
  if (context === undefined) {
    throw new Error("useShowLayout must be used within a ShowLayoutProvider");
  }
  return context;
};
