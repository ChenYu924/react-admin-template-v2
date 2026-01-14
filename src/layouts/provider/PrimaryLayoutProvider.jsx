import { createContext, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import router from '@/router/index.js';

export const PrimaryLayoutContext = createContext(null);

function normalizePath(p) {
  if (!p) return '/';
  const s = p.replace(/\/+$/, '');
  return s === '' ? '/' : s;
}
function findRouteByPath(routes, pathname, base = '') {
  for (const r of routes) {
    const raw = `${base}/${r.path || ''}`;
    const full = normalizePath(raw.replace(/\/+/g, '/'));
    if (full === pathname) return r;
    if (r.children) {
      const found = findRouteByPath(r.children, pathname, full === '/' ? '' : full);
      if (found) return found;
    }
  }
  return null;
}
function getLayoutFromPath(pathname) {
  const path = normalizePath(pathname);
  const matched = findRouteByPath(router, path, '');
  if (matched) {
    return {
      showMenu: typeof matched.showMenu === 'boolean' ? matched.showMenu : true,
      showHeader: typeof matched.showHeader === 'boolean' ? matched.showHeader : true,
    };
  }
  return { showMenu: true, showHeader: true };
}

function PrimaryLayoutProvider({ children }) {
  const location = useLocation();
  const [layout, setLayout] = useState({
    showMenu: true,
    showHeader: true,
  });
  const value = useMemo(() => ({ ...layout, setLayout }), [layout]);

  useEffect(() => {
    if (location.pathname) {
      const next = getLayoutFromPath(location.pathname);
      if (layout.showMenu !== next.showMenu || layout.showHeader !== next.showHeader) {
        setLayout(next);
      }
    }
  }, [location.pathname]);

  return <PrimaryLayoutContext.Provider value={value}>{children}</PrimaryLayoutContext.Provider>;
}

export default PrimaryLayoutProvider;
