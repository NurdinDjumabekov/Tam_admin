// icons
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const dashboard = {
  id: 'Отчёты',
  title: 'Отчёты',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Графики',
      type: 'item',
      url: '/',
      icon: AssessmentOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
