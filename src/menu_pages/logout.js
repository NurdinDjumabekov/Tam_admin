// assets
import { IconKey } from '@tabler/icons-react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const logout = {
  id: 'crud_logout',
  title: 'Аккаунт',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Выход',
      type: 'item',
      url: '/order/crud_logout',
      icon: ExitToAppIcon,
      breadcrumbs: false
    }
  ]
};

export default logout;
