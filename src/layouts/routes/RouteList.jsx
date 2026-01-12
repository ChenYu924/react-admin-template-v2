import { BrowserRouter, Routes, Route } from 'react-router-dom';
import router from '@/router/index.js';
import { generateUUID } from '@/utils/commonUtils.js';
import Page403 from '@/pages/Page403.jsx';
import Page404 from '@/pages/Page404.jsx';

const allPages = Object.fromEntries(
  Object.entries(import.meta.glob('/src/{layouts,pages}/**/*.{jsx,tsx}', { eager: true })).map(
    ([path, mod]) => {
      const filename = path.split('/').pop();
      const name = filename.replace(/\.(jsx|tsx)$/, '');
      return [name, mod.default || mod];
    },
  ),
);

function RouteList() {
  function getElement(route) {
    const Component = allPages[route.layout || route.element];
    if (Array.isArray(route.wrappers) && route.wrappers.length) {
      return route.wrappers.reduce(
        (acc, wrapperName) => {
          const WrapperComponent = allPages[wrapperName];
          return WrapperComponent ? <WrapperComponent>{acc}</WrapperComponent> : acc;
        },
        <Component />,
      );
    }
    return Component ? <Component /> : null;
  }
  function renderRoute(route, isChild = false) {
    return (
      <Route
        key={generateUUID()}
        path={isChild ? route.path.replace(/^\//, '') : route.path}
        element={getElement(route)}
      >
        {Array.isArray(route.children) &&
          route.children.length > 0 &&
          route.children.map((child) => renderRoute(child, true))}
      </Route>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {router.map((route) => renderRoute(route))}
        <Route path="/403" element={<Page403 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteList;
