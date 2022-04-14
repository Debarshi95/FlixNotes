import { createContext, useContext, useMemo, useState } from 'react';

const SideDrawerContext = createContext();

export const useSideDrawer = () => useContext(SideDrawerContext);

const SideDrawerProvider = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const value = useMemo(
    () => ({ showDrawer, toggleDrawer: () => setShowDrawer(!showDrawer) }),
    [showDrawer]
  );

  return <SideDrawerContext.Provider value={value}>{children}</SideDrawerContext.Provider>;
};

export default SideDrawerProvider;
