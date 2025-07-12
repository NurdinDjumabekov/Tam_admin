import MainLayout from 'layout/MainLayout';
import WelcomePage from 'views/WelcomePages/WelcomePage';
import ApplicationForAdminPage from 'views/ApplicationForAdminPage/ApplicationForAdminPage';
import LoginPage from 'views/AuthPages/LoginPage/LoginPage';

const WelcomeRoutes = {
  path: '/',
  element: <MainLayout no_auth={true} />,
  children: [
    {
      path: '/',
      element: <WelcomePage />
    },
    {
      path: '/application',
      element: <ApplicationForAdminPage />
    },
    {
      path: '/main',
      element: <LoginPage />
    }
  ]
};

export default WelcomeRoutes;
