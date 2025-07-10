import MainLayout from 'layout/MainLayout';
import WelcomePage from 'views/WelcomePages/WelcomePage';
import ApplicationForAdminPage from 'views/ApplicationForAdminPage/ApplicationForAdminPage';

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
    }
  ]
};

export default WelcomeRoutes;
