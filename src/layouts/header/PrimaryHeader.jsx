import { useNavigate } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import styles from '@/layouts/styles/PrimaryLayout.module.less';

const { Header } = Layout;
const items = [
  {
    key: 'loginOut',
    label: '退出登录',
    icon: <LoginOutlined />,
    danger: true,
  },
];

function PrimaryHeader() {
  const navigate = useNavigate();

  function handleMenuClick({ key }) {
    if (key === 'loginOut') {
      document.cookie = 'token=; path=/; max-age=0';
      navigate('/login');
    }
  }

  return (
    <Header className={styles.header} theme="light">
      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <Avatar className={styles.avatar} icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}

export default PrimaryHeader;
