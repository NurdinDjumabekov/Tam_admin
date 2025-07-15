import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/system';

////// components
import MainCard from 'ui-component/cards/MainCard';
import Titles from 'common/Titles/Titles';

////// style
import './style.scss';

////// icons
import EditIcon from 'assets/MyIcons/EditIcon';
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import MapIcon from 'assets/MyIcons/MapIcon';
import imgPay from '../../../assets/images/icons/pay.svg';
import imgGalery from '../../../assets/images/icons/galery.svg';
import imgList from '../../../assets/images/icons/list.svg';
import imgVideo from '../../../assets/images/icons/video.svg';
import imgListConv from '../../../assets/images/icons/list_convencies.svg';
import imgDoor from '../../../assets/images/icons/door.svg';

const MenuActionApartmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleAction = (action) => {
    if (action == 1) {
      //// редактирование глfвных данных
      navigate('/every/apartment_crud', { state: { ...location.state, nav: 2 } });
    }
    if (action == 2) {
      //// удаление квартиры
      navigate('/every/apartment_crud', { state: { ...location.state, action_type: 3, nav: 2 } });
    }

    if (action == 3) {
      //// crud список правил
      navigate('/every/rules_action', { state: location.state });
    }

    if (action == 4) {
      //// crud список удобств
      navigate('/every/conveniences_action', { state: location.state });
    }

    if (action == 5) {
      //// редактирование координат
      navigate('/every/map_action', { state: { ...location.state, nav: 2 } });
    }

    if (action == 6) {
      //// редактирование цен
      navigate('/every/view_apartment_price', { state: location.state });
    }

    if (action == 7) {
      //// редактирование и отображение фото квартиры
      navigate('/every/view_apartment_photo', { state: location.state });
    }

    if (action == 8) {
      //// редактирование и отображение видео квартиры
      navigate('/every/view_apartment_video', { state: location.state });
    }

    if (action == 9) {
      //// редактирование и отображение видео квартиры
      navigate('/every/crud_apartment_lock', { state: location.state });
    }
  };

  return (
    <div className="container tableOrders crudTableOrders tableMenuActions">
      <MainCard
        title={<Titles title={`${location?.state?.address} (Информация о квартире)`} />}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="tableMenuActions__inner">
          <div className="orderTableWrapper">
            <button onClick={() => handleAction(1)}>
              <EditIcon width="18" height="18" title={''} />
              <p>Редактирование квартиры</p>
            </button>

            <button onClick={() => handleAction(2)}>
              <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title={''} />
              <p>Удалить квартиру</p>
            </button>

            <button onClick={() => handleAction(3)}>
              <img className="listIcon" src={imgList} alt="*" width={16} height={16} />
              <p>Правила квартиры</p>
            </button>

            <button onClick={() => handleAction(4)}>
              <img className="listIcon" src={imgListConv} alt="*" width={16} height={16} />
              <p>Удобства квартиры</p>
            </button>

            <button onClick={() => handleAction(5)}>
              <MapIcon width="18" height="18" title={''} />
              <p>Посмотреть на карте</p>
            </button>

            <button onClick={() => handleAction(6)}>
              <img className="payIcon" src={imgPay} alt="*" width={16} height={16} />
              <p>Прайс квартиры</p>
            </button>

            <button onClick={() => handleAction(7)}>
              <img className="payIcon" src={imgGalery} alt="*" width={19} height={19} />
              <p>Фотографии квартиры</p>
            </button>

            <button onClick={() => handleAction(8)}>
              <img className="videoIcon" src={imgVideo} alt="*" width={19} height={19} />
              <p>Видео квартиры</p>
            </button>

            <button onClick={() => handleAction(9)}>
              <img className="videoIcon" src={imgDoor} alt="*" width={19} height={19} />
              <p>Данные замка</p>
            </button>
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default MenuActionApartmentPage;
