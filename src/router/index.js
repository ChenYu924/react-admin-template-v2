import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/login/LoginPage.jsx';
import PrimaryLayout from '@/layouts/PrimaryLayout.jsx';
import Workspace from '@/pages/workspace/Workspace.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/',
    Component: PrimaryLayout,
    children: [
      {
        path: '/workspace',
        Component: Workspace,
      },
    ],
  },
]);

export default router;
