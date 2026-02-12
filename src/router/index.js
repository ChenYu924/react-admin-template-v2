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
        path: '/drag',
        element: 'CustomDrag',
      },
      {
        path: '/2048',
        element: 'Chessboard',
      },
      {
        path: '/customTurntable',
        element: 'CustomTurntable',
      },
      {
        path: '/menu1',
        element: 'Menu1',
      },
      {
        path: '/menu2',
        element: 'Menu2',
      },
      {
        path: '/menu3',
        element: 'Menu3',
      },
      {
        path: '/menu4',
        element: 'Menu4',
      },
    ],
  },
];

export default router;
