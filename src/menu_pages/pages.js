// assets
import { IconKey } from '@tabler/icons-react';

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: IconKey,

      children: [
        // {
        //   id: 'user',
        //   title: 'Пользователи',
        //   type: 'item',
        //   url: '/users/info',
        //   target: false
        // },
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: false
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: false
        }
      ]
    }
  ]
};

export default pages;
