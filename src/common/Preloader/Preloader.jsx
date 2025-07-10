import { useSelector } from 'react-redux';
import './style.scss';

const Preloader = ({ view_left_menu }) => {
  const { preloader_user } = useSelector((state) => state.usersSlice);
  const { preloader_apartment } = useSelector((state) => state.apartmentsSlice);
  const { preloader_other_action } = useSelector((state) => state.otherActionApartmentSlice);
  const { preloader_lock } = useSelector((state) => state.lockSlice);
  const { preloader_order } = useSelector((state) => state.orderSlice);
  const { preloader_docs } = useSelector((state) => state.docsSlice);

  if (preloader_docs || preloader_user || preloader_apartment || preloader_other_action || preloader_lock || preloader_order) {
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
