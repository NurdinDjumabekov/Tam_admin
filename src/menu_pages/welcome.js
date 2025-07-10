// icons
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const welcome = {
  id: 'Страница входа',
  title: 'Страница входа',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Главная страница',
      type: 'item',
      url: '/',
      icon: AssessmentOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default welcome;
