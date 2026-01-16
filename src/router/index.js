const router = [
  {
    path: '/login',
    element: 'LoginPage',
  },
  {
    path: '/',
    element: 'HomePage',
  },
  {
    path: '/',
    layout: 'PrimaryLayout',
    children: [
      {
        path: 'workspace',
        element: 'Workspace',
        wrappers: ['Authenticated'],
        showMenu: true,
        showHeader: true,
      },
      {
        path: 'menu1',
        element: 'MenuPage1',
      },
      {
        path: 'menu2',
        element: 'MenuPage2',
      }
    ],
  },
];

export default router;
