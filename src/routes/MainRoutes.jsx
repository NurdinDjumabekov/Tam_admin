import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ListLandlordPage from 'views/ListLandlordPage/ListLandlordPage';
import ListApartmentLandlordPage from 'views/ListApartmentLandlordPage/ListApartmentLandlordPage';
import ListUsersPage from 'views/ListUsersPage/ListUsersPage';
import ListOrdersPage from 'views/ListOrdersPage/ListOrdersPage';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'list',
      children: [{ path: 'users', element: <ListUsersPage /> }]
    },
    {
      path: 'list',
      children: [{ path: 'landlords', element: <ListLandlordPage /> }]
    },
    {
      path: 'list',
      children: [{ path: 'orders', element: <ListOrdersPage /> }]
    },
    {
      path: 'list',
      children: [{ path: 'apartment_landlord', element: <ListApartmentLandlordPage /> }]
    }
  ]
};

export default MainRoutes;
