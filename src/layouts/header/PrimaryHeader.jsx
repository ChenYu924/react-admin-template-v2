import { useNavigate } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import styles from '@/layouts/styles/PrimaryLayout.module.less';
import Cookies from 'js-cookie';

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
      Cookies.remove('token');
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
