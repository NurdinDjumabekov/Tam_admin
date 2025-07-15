import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/system';

import MainCard from 'ui-component/cards/MainCard';

import './style.scss';
import { myAlert } from 'helpers/myAlert';
import { delPhotoApartmentReq } from 'store/reducers/otherActionApartmentSlice';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

///// icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import DelAlert from 'common/DelAlert/DelAlert';

const CrudPhotoApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isSmall = useMediaQuery('(max-width:550px)');
  const navigate = useNavigate();

  const delPhotoFn = async ({ guid }) => {
    const result = await dispatch(delPhotoApartmentReq({ guid_photo: location?.state?.imgs_guid })).unwrap();
    if (result.res === 1) {
      myAlert('Изображение удалено успешно');
      navigate(-1);
    }
  };

  const [sliderRef, instanceRef] = useKeenSlider(
    location?.state?.imgs_list?.length > 0
      ? {
          loop: true,
          slides: { perView: 1 }
        }
      : null
  );

  if (location?.state?.action_type == 3) {
    return (
      <DelAlert
        title={'Удаление фото квартиры'}
        text={
          'Вы действительно хотите удалить фото квартиры ? Этот процесс не обратим, если вы удалеите фото квартиры, то данные восстановить не получится!'
        }
        click={delPhotoFn}
        yesText={'Удалить'}
        noText={'Отмена'}
      />
    );
  }

  return (
    <div className="crudPhoto">
      <div className="crudPhoto__inner">
        <MainCard title={''}>
          <div className="slider-container-big">
            <button className="krest_btn_imgs" onClick={() => navigate(-1)}>
              <CloseIcon />
            </button>
            <div className="keen-slider" ref={sliderRef} style={{ maxWidth: '100%', margin: '0 auto' }}>
              {location?.state?.imgs_list?.map((i, index) => (
                <div key={index} className="keen-slider__slide">
                  <img src={i?.url} alt={`img-${index}`} />
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button onClick={() => instanceRef?.current?.prev()} className="slider-button prev">
                <ArrowBackIosNewIcon />
              </button>
              <button onClick={() => instanceRef?.current?.next()} className="slider-button next">
                <ArrowForwardIosIcon />
              </button>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  );
};

export default CrudPhotoApartmentPage;
