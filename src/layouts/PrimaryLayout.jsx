import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, FloatButton } from 'antd';
import styles from './styles/PrimaryLayout.module.less';
import { PrimaryLayoutContext } from '@/layouts/provider/PrimaryLayoutProvider.jsx';
import PrimarySider from '@/layouts/sider/PrimarySider.jsx';
import PrimaryHeader from '@/layouts/header/PrimaryHeader.jsx';

const { Content } = Layout;
const { BackTop } = FloatButton;

function PrimaryLayout() {
  const { showMenu, showHeader } = useContext(PrimaryLayoutContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.container}>
      {showMenu && <PrimarySider collapsed={collapsed} />}
      <Layout>
        {showHeader && <PrimaryHeader collapsed={collapsed} setCollapsed={setCollapsed} />}
        <Content>
          <div className={styles.content}>
            <Outlet />
            <BackTop visibilityHeight={560} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrimaryLayout;
