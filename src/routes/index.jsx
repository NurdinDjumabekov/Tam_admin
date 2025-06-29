import { createBrowserRouter } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import RoutesNoLayout from './RoutesNoLayout';

const router = createBrowserRouter([MainRoutes, RoutesNoLayout, LoginRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
