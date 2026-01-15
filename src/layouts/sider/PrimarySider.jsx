import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
import styles from '@/layouts/styles/PrimaryLayout.module.less';

const { Sider } = Layout;
/**
 * @typedef {Object} MenuItem - {key, label, icon?, path?, children?}
 * 菜单数据说明：通常由后端提供；登录时可缓存到 Redux/本地；根据用户角色/权限返回对应菜单。
 */
const items = [
  {
    key: '/workspace',
    label: '我的工作台',
    icon: <DashboardOutlined />,
  },
  {
    key: '2',
    label: '目录1',
    icon: <ProfileOutlined />,
    children: [
      {
        key: '/menu1-1',
        label: '菜单1-1',
      },
      {
        key: '2-2',
        label: '菜单1-2',
        children: [
          {
            key: '/403',
            label: '菜单1-2-1',
          },
        ],
      },
    ],
  },
  // {
  //   key: '3',
  //   label: '目录2',
  //   icon: <ProfileOutlined />,
  //   children: [
  //     ...Array.from({ length: 80 }, (_, i) => ({
  //       key: `3-${i}`,
  //       label: `菜单2-${i + 1}`,
  //     })),
  //   ],
  // },
];

function PrimarySider({ collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentMenuItemKey, setCurrentMenuItemKey] = useState();

  useEffect(() => {
    if (location.pathname) {
      setCurrentMenuItemKey(location.pathname);
    }
  }, [location]);

  function handleMenuItemClick({ key }) {
    setCurrentMenuItemKey(key);
    navigate(key);
  }

  return (
    <Sider className={styles.slider} collapsed={collapsed} theme="light">
      <div className={styles.logoContainer}>
        <div className={styles.logo} />
      </div>
      <div className={styles.menuContainer}>
        <Menu
          items={items}
          selectedKeys={[currentMenuItemKey]}
          mode="inline"
          onClick={handleMenuItemClick}
        />
      </div>
    </Sider>
  );
}

export default PrimarySider;
