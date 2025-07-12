// icons
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const dashboard = {
  id: 'Отчёты',
  title: 'Отчёты',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Отчёты',
      type: 'item',
      url: '/main',
      icon: AssessmentOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
