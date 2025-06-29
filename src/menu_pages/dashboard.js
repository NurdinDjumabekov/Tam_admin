// icons
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const dashboard = {
  id: 'Отчёты',
  title: 'Отчёты',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Графики',
      type: 'item',
      url: '/',
      icon: AssessmentOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

// id: 'dashboard',
// title: 'Dashboard',
// type: 'group',
// children: [
//   {
//     id: 'default',
//     title: 'Dashboard',
//     type: 'item',
//     url: '/dashboard/default',
//     icon: icons.IconDashboard,
//     breadcrumbs: false
//   }
// ]
