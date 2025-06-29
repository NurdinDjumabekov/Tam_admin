import EveryApartmentPage from 'views/EveryApartmentPage/EveryApartmentPage';
import MainLayout from 'layout/MainLayout';
import CrudMainApartmentPage from 'views/CrudApartmentPages/CrudMainApartmentPage/CrudMainApartmentPage';
import MenuActionApartmentPage from 'views/CrudApartmentPages/MenuActionApartmentPage/MenuActionApartmentPage';
import CrudRulesApartmentPage from 'views/CrudApartmentPages/CrudRulesApartmentPage/CrudRulesApartmentPage';
import CrudConveniencesApartmentPage from 'views/CrudApartmentPages/CrudConveniencesApartmentPage/CrudConveniencesApartmentPage';
import CrudCoordinatesPage from 'views/CrudApartmentPages/CrudCoordinatesPage/CrudCoordinatesPage';
import CrudPriceApartmentPage from 'views/CrudApartmentPages/CrudPriceApartmentPage/CrudPriceApartmentPage';
import ViewPriceApartmentPage from 'views/CrudApartmentPages/ViewPriceApartmentPage/ViewPriceApartmentPage';

const RoutesNoLayout = {
  path: '/every',
  element: <MainLayout view_left_menu={false} />,
  children: [
    {
      path: 'apartment',
      element: <EveryApartmentPage />
    },
    {
      path: 'apartment_crud',
      element: <CrudMainApartmentPage />
    },
    {
      path: 'menu_action',
      element: <MenuActionApartmentPage />
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
      path: 'map_action',
      element: <CrudCoordinatesPage />
    },
    {
      path: 'view_apartment_price',
      element: <ViewPriceApartmentPage />
    },

    {
      path: 'crud_apartment_price',
      element: <CrudPriceApartmentPage />
    }
  ]
};

export default RoutesNoLayout;
