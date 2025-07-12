import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DomainIcon from '@mui/icons-material/Domain';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const utilities = {
  id: 'Главное',
  title: 'Главное',
  type: 'group',
  children: [
    {
      id: 'landlords',
      title: 'Арендодатели',
      type: 'item',
      url: '/list/landlords',
      icon: SupervisedUserCircleIcon,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Бронь',
      type: 'item',
      url: '/list/orders',
      icon: MeetingRoomIcon,
      breadcrumbs: false
    }
    // {
    //   id: 'users',
    //   title: 'Пользователи',
    //   type: 'item',
    //   url: '/list/users',
    //   icon: GroupAddIcon,
    //   breadcrumbs: false
    // }

    // {
    //   id: 'apartment_landlord',
    //   title: 'Квартиры',
    //   type: 'item',
    //   url: '/list/apartment_landlord',
    //   icon: DomainIcon,
    //   breadcrumbs: false
    // },

    // {
    //   id: 'util-typography',
    //   title: 'Typography',
    //   type: 'item',
    //   url: '/utils/util-typography',
    //   icon: IconTypography,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-color',
    //   title: 'Color',
    //   type: 'item',
    //   url: '/utils/util-color',
    //   icon: IconPalette,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: IconShadow,
    //   breadcrumbs: false
    // }
  ]
};

export default utilities;
