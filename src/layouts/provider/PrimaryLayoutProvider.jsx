import { createContext, useState, useMemo } from 'react';

const PrimaryLayoutContext = createContext(null);

function PrimaryLayoutProvider({ children }) {
  const [layout, setLayout] = useState({
    showMenu: true,
    showHeader: true,
  });
  const value = useMemo(() => ({ ...layout, setLayout }), [layout]);

  return <PrimaryLayoutContext.Provider value={value}>{children}</PrimaryLayoutContext.Provider>;
}

export default PrimaryLayoutProvider;
