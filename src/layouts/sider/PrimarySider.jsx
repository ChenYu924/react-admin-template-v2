import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu } from 'antd';
import styles from '@/layouts/styles/PrimaryLayout.module.less';
import MenuIconObj from '@/config/MenuIconObj.jsx';

const { Sider } = Layout;

function PrimarySider() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.user.menu);
  const collapsed = useSelector((state) => state.system.siderCollapsed);
  const menuKey = useSelector((state) => state.system.menuKey);

  useEffect(() => {
    if (menuKey) {
      navigate(menuKey);
    }
  }, [menuKey]);

  function handleLogoClick() {
    navigate('/');
  }
  function handleMenuItemClick({ key }) {
    navigate(key);
    dispatch({ type: 'system/setMenuKey', payload: key });
  }
  function renderMenuItem(item) {
    const { key, label, icon, children } = item;
    const MenuIcon = MenuIconObj[icon];

    return {
      key,
      label,
      icon: icon && MenuIcon && <MenuIcon />,
      children: children && children.length > 0 && children.map(renderMenuItem),
    };
  }

  return (
    <Sider className={styles.slider} collapsed={collapsed} theme="light">
      <div className={styles.logoContainer}>
        <div className={styles.logo} onClick={handleLogoClick} />
      </div>
      <div className={styles.menuContainer}>
        <Menu
          items={items.map(renderMenuItem)}
          selectedKeys={[menuKey || location.pathname]}
          mode="inline"
          onClick={handleMenuItemClick}
        />
      </div>
    </Sider>
  );
}

export default PrimarySider;
