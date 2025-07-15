// App.tsx
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';

import MainRoutes from 'routes/MainRoutes';
import RoutesApartments from 'routes/RoutesApartments';
import RoutesOrders from 'routes/RoutesOrders';
import WelcomeRoutes from 'routes/WelcomeRoutes';
import NotFoundPage from 'views/AuthPages/NotFoundPage/NotFoundPage';
import { useEffect } from 'react';

const App = () => {
  const dataSave = useSelector((state) => state.saveDataSlice.dataSave);
  const isLoggedIn = dataSave?.guid && dataSave?.typeUser && dataSave?.fio && dataSave?.phoneNumber;

  const router = createBrowserRouter(
    [
      ...(isLoggedIn ? [MainRoutes, RoutesApartments, RoutesOrders] : [WelcomeRoutes]),
      {
        path: '*',
        element: <NotFoundPage />
      }
    ],
    {
      basename: import.meta.env.VITE_APP_BASE_NAME
    }
  );

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document);
    if (isIOS) {
      document.body.classList.add('ios');
    } else {
      document.body.classList.remove('ios');
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes({})}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
