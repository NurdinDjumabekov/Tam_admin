import EveryApartmentPage from 'views/EveryApartmentPage/EveryApartmentPage';
import MainLayout from 'layout/MainLayout';
import CrudMainApartmentPage from 'views/CrudApartmentPages/CrudMainApartmentPage/CrudMainApartmentPage';
import MenuActionApartmentPage from 'views/CrudApartmentPages/MenuActionApartmentPage/MenuActionApartmentPage';
import CrudRulesApartmentPage from 'views/CrudApartmentPages/CrudRulesApartmentPage/CrudRulesApartmentPage';
import CrudConveniencesApartmentPage from 'views/CrudApartmentPages/CrudConveniencesApartmentPage/CrudConveniencesApartmentPage';
import CrudCoordinatesPage from 'views/CrudApartmentPages/CrudCoordinatesPage/CrudCoordinatesPage';
import CrudPriceApartmentPage from 'views/CrudApartmentPages/CrudPriceApartmentPage/CrudPriceApartmentPage';
import ViewPriceApartmentPage from 'views/CrudApartmentPages/ViewPriceApartmentPage/ViewPriceApartmentPage';
import CrudPhotoApartmentPage from 'views/CrudApartmentPages/CrudPhotoApartmentPage/CrudPhotoApartmentPage';
import ViewVideoApartmentPage from 'views/CrudApartmentPages/ViewVideoApartmentPage/ViewVideoApartmentPage';
import ViewLockApartmentPage from 'views/CrudApartmentPages/ViewLockApartmentPage/ViewLockApartmentPage';
import ViewEveryVideoApartmentPage from 'views/CrudApartmentPages/ViewEveryVideoApartmentPage/ViewEveryVideoApartmentPage';

const RoutesApartments = {
  path: '/every',
  element: <MainLayout view_left_menu={false} />,
  children: [
    {
      path: 'apartment',
      element: <EveryApartmentPage />
    },
    {
      path: 'menu_action',
      element: <MenuActionApartmentPage />
    },
    {
      path: 'apartment_crud',
      element: <CrudMainApartmentPage />
    },
    {
      path: 'map_action',
      element: <CrudCoordinatesPage />
    },
    {
      path: 'rules_action',
      element: <CrudRulesApartmentPage />
    },
    {
      path: 'conveniences_action',
      element: <CrudConveniencesApartmentPage />
    },
    {
      path: 'view_apartment_price',
      element: <ViewPriceApartmentPage />
    },
    {
      path: 'crud_apartment_price',
      element: <CrudPriceApartmentPage />
    },
    {
      path: 'crud_apartment_photo',
      element: <CrudPhotoApartmentPage />
    },
    {
      path: 'view_apartment_lock',
      element: <ViewLockApartmentPage />
    },
    {
      path: 'view_apartment_video',
      element: <ViewVideoApartmentPage />
    },
    {
      path: 'view_every_apartment_video',
      element: <ViewEveryVideoApartmentPage />
    }
  ]
};

export default RoutesApartments;
