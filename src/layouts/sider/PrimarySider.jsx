import { Layout } from 'antd';
import styles from '@/layouts/styles/PrimaryLayout.module.less';

const { Sider } = Layout;

function PrimarySider() {
  return <Sider className={styles.slider} theme="light"></Sider>;
}

export default PrimarySider;
