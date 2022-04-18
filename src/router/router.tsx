import { Suspense, lazy } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { Navigate } from 'react-router';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

//Auth
const Login = Loader(lazy(() => import('src/content/pages/Login')));
// const LoginAuth = Loader(lazy(() => import('src/content/pages/Login'))); // use for SSO Login

// Pages
const Role = Loader(lazy(() => import('src/content/pages/Roles')));
const User = Loader(lazy(() => import('src/content/pages/User')));
const AttachPer = Loader(lazy(() => import('src/content/pages/Roles/attachPer/Index')));
// Status
const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));

const routes = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '404',
        element: <Status404 />
      },
      {
        path: '500',
        element: <Status500 />
      },
      {
        path: 'maintenance',
        element: <StatusMaintenance />
      },
      {
        path: 'coming-soon',
        element: <StatusComingSoon />
      },
      {
        path: '',
        element: <Navigate to={"/admin"} />
      },
    ]
  },

  {
    path: 'login',
    element: (
      <BaseLayout />
    ),
    children: [
      {
        path: '',
        element: <Login />
      },
    ]
  },
  {
    path: 'admin',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: 'role',
        element: <Role />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'attach_permission/:id',
        element: <AttachPer />
      }
    ]
  },
];

export default routes;
