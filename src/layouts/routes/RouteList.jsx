import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import router from '@/router/index.js';
import { generateUUID } from '@/utils/commonUtils.js';
import Page403 from '@/pages/Page403.jsx';
import Page404 from '@/pages/Page404.jsx';

const modules = import.meta.glob('/src/{layouts,pages}/**/*.{jsx,tsx}');
const allPages = Object.fromEntries(
  Object.entries(modules).map(([path, resolver]) => {
    const filename = path.split('/').pop();
    const name = filename.replace(/\.(jsx|tsx)$/, '');
    const LazyComp = lazy(resolver);
    return [name, LazyComp];
  }),
);

function RouteList() {
  function renderLazy(Component, children = null) {
    return Component ? (
      <Suspense fallback={<Spin fullscreen />}>
        <Component>{children}</Component>
      </Suspense>
    ) : null;
  }
  function getElement(route) {
    const Component = allPages[route.layout || route.element];
    if (Array.isArray(route.wrappers) && route.wrappers.length) {
      return route.wrappers.reduce((acc, wrapperName) => {
        const WrapperComponent = allPages[wrapperName];
        return WrapperComponent ? renderLazy(WrapperComponent, acc) : acc;
      }, renderLazy(Component));
    }
    return renderLazy(Component);
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
    <Routes>
      {router.map((route) => renderRoute(route))}
      <Route path="/403" element={<Page403 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default RouteList;
