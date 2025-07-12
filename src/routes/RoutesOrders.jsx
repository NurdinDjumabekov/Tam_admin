import MainLayout from 'layout/MainLayout';
import CrudOrdersPage from 'views/CrudOrdersPages/CrudOrdersPage/CrudOrdersPage';
import CrudCleaningTimesPage from 'views/CrudOrdersPages/CrudCleaningTimesPage/CrudCleaningTimesPage';
import CrudPasswordLockOrderPage from 'views/CrudOrdersPages/CrudPasswordLockOrderPage/CrudPasswordLockOrderPage';
import CrudPayPage from 'views/CrudOrdersPages/CrudPayPage/CrudPayPage';
import CrudStartEndOrder from 'views/CrudOrdersPages/CrudStartEndOrder/CrudStartEndOrder';
import CrudStatusOrder from 'views/CrudOrdersPages/CrudStatusOrder/CrudStatusOrder';
import ChoiceUserPage from 'views/CrudOrdersPages/ChoiceUserPage/ChoiceUserPage';
import CreateOrdersUserPage from 'views/CrudOrdersPages/CreateOrdersUserPage/CreateOrdersUserPage';
import ChoiceApartmentPage from 'views/CrudOrdersPages/ChoiceApartmentPage/ChoiceApartmentPage';
import CreateOrdersLandlordPage from 'views/CrudOrdersPages/CreateOrdersLandlordPage/CreateOrdersLandlordPage';
import LogOutPage from 'components/LogOut/LogOutPage/LogOutPage';

const RoutesOrders = {
  path: '/order',
  element: <MainLayout view_left_menu={false} />,
  children: [
    {
      path: 'every',
      element: <CrudOrdersPage />
    },
    ////// создание заказа пользователю
    {
      path: 'create_order_users',
      element: <CreateOrdersUserPage />
    },
    {
      path: 'choice_user',
      element: <ChoiceUserPage />
    },
    {
      path: 'choice_apartment',
      element: <ChoiceApartmentPage />
    },
    ////////////////////////////////////////////////
    {
      path: 'create_order_landlords',
      element: <CreateOrdersLandlordPage />
    },
    ////////////////////////////////////////////////
    {
      path: 'crud_cleaning_times',
      element: <CrudCleaningTimesPage />
    },
    {
      path: 'crud_password_lock',
      element: <CrudPasswordLockOrderPage />
    },
    {
      path: 'crud_pay_order',
      element: <CrudPayPage />
    },
    {
      path: 'crud_start_end_order',
      element: <CrudStartEndOrder />
    },
    {
      path: 'crud_status_order',
      element: <CrudStatusOrder />
    },
    {
      path: 'crud_logout',
      element: <LogOutPage />
    }
  ]
};

export default RoutesOrders;
