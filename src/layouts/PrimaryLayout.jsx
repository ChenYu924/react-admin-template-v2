import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './styles/PrimaryLayout.module.less';
import PrimarySider from '@/layouts/sider/PrimarySider.jsx';
import PrimaryHeader from '@/layouts/header/PrimaryHeader.jsx';

const { Content } = Layout;

function PrimaryLayout() {
  return (
    <Layout className={styles.container}>
      <PrimarySider />
      <Layout>
        <PrimaryHeader />
        <Content>
          <div className={styles.content}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrimaryLayout;
