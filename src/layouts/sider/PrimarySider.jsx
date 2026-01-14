import { Layout, Menu } from 'antd';
import { DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
import styles from '@/layouts/styles/PrimaryLayout.module.less';

const { Sider } = Layout;
const items = [
  {
    key: '1',
    label: '我的工作台',
    icon: <DashboardOutlined />,
    path: '/workspace',
  },
  {
    key: '2',
    label: '目录1',
    icon: <ProfileOutlined />,
    children: [
      {
        key: '2-1',
        label: '菜单1-1',
      },
      {
        key: '2-2',
        label: '菜单1-2',
        children: [
          {
            key: '2-2-1',
            label: '菜单1-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '3',
    label: '目录2',
    icon: <ProfileOutlined />,
    children: [
      ...Array.from({ length: 80 }, (_, i) => ({
        key: `3-${i}`,
        label: `菜单2-${i + 1}`,
      })),
    ],
  },
];

function PrimarySider({ collapsed }) {
  return (
    <Sider className={styles.slider} collapsed={collapsed} theme="light">
      <div className={styles.logoContainer}>
        <div className={styles.logo} />
      </div>
      <div className={styles.menuContainer}>
        <Menu
          items={items}
          selectedKeys={['1']}
          mode="inline"
          popupClassName={styles.siderPopup} // 限制弹窗高度的样式类（由 css module 提供）
          getPopupContainer={() => document.body} // 将弹窗挂载到 body，避免撑高侧栏/页面
        />
      </div>
    </Sider>
  );
}

export default PrimarySider;
