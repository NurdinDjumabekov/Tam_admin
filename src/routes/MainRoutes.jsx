import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ListLandlordPage from 'views/ListLandlordPage/ListLandlordPage';
import ListApartmentLandlordPage from 'views/ListApartmentLandlordPage/ListApartmentLandlordPage';
import ListUsersPage from 'views/ListUsersPage/ListUsersPage';
import ListOrdersPage from 'views/ListOrdersPage/ListOrdersPage';
import { Navigate } from 'react-router-dom';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/main" replace />
    },
    {
      path: '/main',
      element: <DashboardDefault />
    },
    {
      path: 'list', ////////++++++++++++
      children: [{ path: 'landlords', element: <ListLandlordPage /> }]
    },
    {
      path: 'list',
      children: [{ path: 'users', element: <ListUsersPage /> }]
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

// ////////// hooks
// import * as React from 'react';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// /////// fns

// ////// components

// ////// style
// import './style.scss';

// ////// icons

// //// страница входа
// const WelcomePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return <div></div>;
// };

// export default WelcomePage;
