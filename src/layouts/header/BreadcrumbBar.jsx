import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumb } from 'antd';

function BreadcrumbBar() {
  const location = useLocation();
  const menu = useSelector((state) => state.user.menu);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (location.pathname) {
      getBreadcrumbItems(location.pathname);
    }
  }, [location.pathname]);

  function findItemByMenu(menu, path) {
    const stack = [];
    const result = [];
    function dfs(items) {
      for (const item of items) {
        stack.push(item);
        if (item.key === path) {
          result.push(...stack);
          return true;
        }
        if (item.children && dfs(item.children)) {
          return true;
        }
        stack.pop();
      }
      return false;
    }
    dfs(menu);
    return result;
  }
  function getBreadcrumbItems(path) {
    const list = findItemByMenu(menu, path);
    const breadcrumbItems = list.map((item) => ({
      title: item.label,
    }));
    setItems(breadcrumbItems);
  }

  return <Breadcrumb className="select-none" items={items} />;
}

export default BreadcrumbBar;
