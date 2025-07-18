import EveryApartmentPage from 'views/EveryApartmentPage/EveryApartmentPage';
import MainLayout from 'layout/MainLayout';
import CrudMainApartmentPage from 'views/CrudApartmentPages/CrudMainApartmentPage/CrudMainApartmentPage';
import MenuActionApartmentPage from 'views/CrudApartmentPages/MenuActionApartmentPage/MenuActionApartmentPage';
import CrudRulesApartmentPage from 'views/CrudApartmentPages/CrudRulesApartmentPage/CrudRulesApartmentPage';
import CrudConveniencesApartmentPage from 'views/CrudApartmentPages/CrudConveniencesApartmentPage/CrudConveniencesApartmentPage';
import CrudCoordinatesPage from 'views/CrudApartmentPages/CrudCoordinatesPage/CrudCoordinatesPage';
import CrudPriceApartmentPage from 'views/CrudApartmentPages/CrudPriceApartmentPage/CrudPriceApartmentPage';
import ViewPriceApartmentPage from 'views/CrudApartmentPages/ViewPriceApartmentPage/ViewPriceApartmentPage';
import ViewPhotoApartmentPage from 'views/CrudApartmentPages/ViewPhotoApartmentPage/ViewPhotoApartmentPage';
import ViewVideoApartmentPage from 'views/CrudApartmentPages/ViewVideoApartmentPage/ViewVideoApartmentPage';
import ViewLockApartmentPage from 'views/CrudApartmentPages/ViewLockApartmentPage/ViewLockApartmentPage';
import ViewEveryVideoApartmentPage from 'views/CrudApartmentPages/ViewEveryVideoApartmentPage/ViewEveryVideoApartmentPage';
import CrudLandlordsPage from 'views/CrudApartmentPages/CrudLandlordsPage/CrudLandlordsPage';
import CrudPhotoApartmentPage from 'views/CrudApartmentPages/CrudPhotoApartmentPage/CrudPhotoApartmentPage';

const RoutesApartments = {
  path: '/every',
  element: <MainLayout view_left_menu={false} />,
  children: [
    {
      path: 'apartments', ////////++++++++++++
      element: <EveryApartmentPage />
    },
    {
      path: 'menu_action', ////////++++++++++++
      element: <MenuActionApartmentPage />
    },
    {
      path: 'crud_user',
      element: <CrudLandlordsPage />
    },
    {
      path: 'apartment_crud', ////////++++++++++++
      element: <CrudMainApartmentPage />
    },
    {
      path: 'map_action', ////////++++++++++++
      element: <CrudCoordinatesPage />
    },
    {
      path: 'rules_action', ////////++++++++++++
      element: <CrudRulesApartmentPage />
    },
    {
      path: 'conveniences_action', ////////++++++++++++
      element: <CrudConveniencesApartmentPage />
    },
    {
      path: 'view_apartment_price', ////////++++++++++++
      element: <ViewPriceApartmentPage />
    },
    {
      path: 'crud_apartment_price', ////////++++++++++++
      element: <CrudPriceApartmentPage />
    },
    {
      path: 'view_apartment_photo', ////////++++++++++++
      element: <ViewPhotoApartmentPage />
    },
    {
      path: 'crud_apartment_photo', ////////++++++++++++
      element: <CrudPhotoApartmentPage />
    },
    {
      path: 'view_apartment_video', ////////++++++++++++
      element: <ViewVideoApartmentPage />
    },
    {
      path: 'view_every_apartment_video', ////////++++++++++++
      element: <ViewEveryVideoApartmentPage />
    },
    {
      path: 'crud_apartment_lock', ////////++++++++++++
      element: <ViewLockApartmentPage />
    }
  ]
};

export default RoutesApartments;
