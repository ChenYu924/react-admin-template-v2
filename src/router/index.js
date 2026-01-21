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
    ],
  },
];

export default router;
