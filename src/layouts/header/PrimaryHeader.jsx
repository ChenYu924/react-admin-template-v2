import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Avatar, Dropdown } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import styles from '@/layouts/styles/PrimaryLayout.module.less';
import BreadcrumbBar from './BreadcrumbBar.jsx';

const { Header } = Layout;
const items = [
  {
    key: 'loginOut',
    label: '退出登录',
    icon: <LoginOutlined />,
    danger: true,
  },
];

function PrimaryHeader({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleMenuClick({ key }) {
    if (key === 'loginOut') {
      dispatch({ type: 'user/setClear' });
      navigate('/login');
    }
  }

  return (
    <Header className={styles.header} theme="light">
      <div className={styles.left}>
        <div className={styles.collapsedContainer} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <BreadcrumbBar />
      </div>
      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <Avatar className={styles.avatar} icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}

export default PrimaryHeader;
