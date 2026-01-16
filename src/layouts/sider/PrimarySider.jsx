import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import styles from '@/layouts/styles/PrimaryLayout.module.less';
import MenuIconObj from '@/config/MenuIconObj.jsx';

const { Sider } = Layout;

function PrimarySider({ collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useSelector((state) => state.user.menu);

  function handleLogoClick() {
    navigate('/');
  }
  function handleMenuItemClick({ key }) {
    navigate(key);
  }
  function renderMenuItem(item) {
    const { key , label, icon, children } = item;
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
          selectedKeys={[location.pathname]}
          mode="inline"
          onClick={handleMenuItemClick}
        />
      </div>
    </Sider>
  );
}

export default PrimarySider;
