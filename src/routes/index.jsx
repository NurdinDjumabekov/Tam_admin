import { createBrowserRouter } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import RoutesApartments from './RoutesApartments';
import RoutesOrders from './RoutesOrders';
import WelcomeRoutes from './WelcomeRoutes';

const router = createBrowserRouter([WelcomeRoutes, MainRoutes, RoutesApartments, RoutesOrders, LoginRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
