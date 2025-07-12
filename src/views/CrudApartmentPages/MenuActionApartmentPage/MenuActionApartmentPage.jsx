////// hooks
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

/////// fns
import { getEveryApartmentsReq } from 'store/reducers/apartmentsSlice';
import { ApartmentStatusesText } from 'helpers/enums';

const MenuActionApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { everyApartment } = useSelector((state) => state.apartmentsSlice);

  console.log(everyApartment, 'everyApartment');

  useEffect(() => {
    getData();
  }, [location?.state?.guid_apartment]);

  const getData = async () => {
    const obj = { guid_apartment: location?.state?.guid_apartment };
    await dispatch(getEveryApartmentsReq(obj)).unwrap();
  };

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
      navigate('/every/crud_apartment_photo', { state: location.state });
    }

    if (action == 8) {
      //// редактирование и отображение видео квартиры
      navigate('/every/view_apartment_video', { state: location.state });
    }

    if (action == 9) {
      //// редактирование и отображение видео квартиры
      navigate('/every/view_apartment_lock', { state: location.state });
    }
  };

  return (
    <div className="container  tableMenuActions">
      <MainCard
        title={<Titles title={`${location?.state?.address}`} />}
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
              {/* <img className="payIcon" src={imgPay} alt="*" width={16} height={16} /> */}
              <PaymentsOutlinedIcon />
              <p>Прайс квартиры</p>
            </button>

            <button onClick={() => handleAction(7)}>
              {/* <img className="payIcon" src={imgGalery} alt="*" width={19} height={19} /> */}
              <PhotoSizeSelectActualOutlinedIcon />
              <p>Фотографии квартиры</p>
            </button>

            <button onClick={() => handleAction(8)}>
              {/* <img className="videoIcon" src={imgVideo} alt="*" width={19} height={19} /> */}
              <PlayCircleOutlinedIcon />
              <p>Видео квартиры</p>
            </button>

            <button onClick={() => handleAction(9)}>
              {/* <img className="videoIcon" src={imgDoor} alt="*" width={19} height={19} /> */}
              <MeetingRoomIcon />
              <p>Данные замка</p>
            </button>
          </div>

          <div className="tableInfo">
            <table>
              <tbody>
                <tr>
                  <td>Тип квартиры</td>
                  <td>{everyApartment?.apartmentsType || '—'}</td>
                </tr>
                <tr>
                  <td>Район</td>
                  <td>{everyApartment?.district || '—'}</td>
                </tr>
                <tr>
                  <td>Адрес</td>
                  <td>
                    г. {everyApartment?.city}, ул. {everyApartment?.address_name} {everyApartment?.house_number}, кв.{' '}
                    {everyApartment?.apartment_number}
                  </td>
                </tr>
                <tr>
                  <td>Этаж</td>
                  <td>
                    {everyApartment?.floor} этаж из {everyApartment?.all_floor}
                  </td>
                </tr>
                <tr>
                  <td>Квадратура</td>
                  <td>{everyApartment?.square} м²</td>
                </tr>
                <tr>
                  <td>Описание</td>
                  <td>{everyApartment?.description || '—'}</td>
                </tr>
                <tr>
                  <td>Тип здания</td>
                  <td>{everyApartment?.more_info || '—'}</td>
                </tr>
                <tr>
                  <td>Установлен замок</td>
                  <td>{everyApartment?.install_lock ? 'Да' : 'Нет'}</td>
                </tr>
                <tr>
                  <td>Статус</td>
                  <td>
                    <p className={everyApartment?.status === 'active' ? 'everyOneActive' : 'everyOneNoActive'}>
                      {ApartmentStatusesText?.[everyApartment?.status] || '—'}
                    </p>
                    <button onClick={() => handleAction(1)}>
                      <EditIcon width="18" height="18" title={''} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default MenuActionApartmentPage;
