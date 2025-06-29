import { useSelector } from 'react-redux';
import './style.scss';

const Preloader = ({ view_left_menu }) => {
  const { preloader_user } = useSelector((state) => state.usersSlice);
  const { preloader_apartment } = useSelector((state) => state.apartmentsSlice);
  const { preloader_other_action } = useSelector((state) => state.otherActionApartmentSlice);

  if (preloader_user || preloader_apartment || preloader_other_action) {
    return (
      <div className={`preloader ${!!view_left_menu ? 'full_display' : 'mini_display'}`}>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};
export default Preloader;
