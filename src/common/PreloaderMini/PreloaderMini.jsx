import { useSelector } from 'react-redux';
import './style.scss';

const PreloaderMini = () => {
  const { preloader_user } = useSelector((state) => state.usersSlice);
  const { preloader_apartment } = useSelector((state) => state.apartmentsSlice);
  const { preloader_other_action } = useSelector((state) => state.otherActionApartmentSlice);

  if (preloader_user || preloader_apartment || preloader_other_action) {
    return <div class="loader"></div>;
  }
};
export default PreloaderMini;
