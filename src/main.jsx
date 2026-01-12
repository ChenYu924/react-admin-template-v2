import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.less';
import './tailwind.css';
import 'aos/dist/aos.css';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
