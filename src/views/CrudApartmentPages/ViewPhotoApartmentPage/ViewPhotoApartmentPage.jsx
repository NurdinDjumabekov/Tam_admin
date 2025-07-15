import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/system';

import MainCard from 'ui-component/cards/MainCard';
import Titles from 'common/Titles/Titles';

import './style.scss';
import { myAlert } from 'helpers/myAlert';
import { delPhotoApartmentReq, getListPhotoApartmentReq, loadPhotoApartmentReq } from 'store/reducers/otherActionApartmentSlice';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

///// icons
import DeleteIcon from 'assets/MyIcons/DeleteIcon';

const ViewPhotoApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isSmall = useMediaQuery('(max-width:550px)');

  const { listPhotosApartment } = useSelector((state) => state.otherActionApartmentSlice);

  useEffect(() => {
    getData();
  }, [location.state.guid_apartment]);

  const fileInputRef = useRef(null);

  const handleAddPhotosClick = () => {
    if (listPhotosApartment?.length >= 8) {
      myAlert('Можно загрузить не более 8 изображений', 'error');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.length > 8) {
      myAlert('Можно загрузить не более 8 изображений', 'error');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('photos', file));
    formData.append('guid_apartment', location.state.guid_apartment);

    const result = await dispatch(loadPhotoApartmentReq(formData)).unwrap();
    if (result.res === 1) {
      myAlert('Изображения загружены');
      getData();
    }
  };

  const delPhotoFn = async ({ guid }) => {
    navigate('/every/crud_apartment_photo', { state: { imgs_guid: guid, action_type: 3 } });
  };

  const getData = () => {
    const send = { guid_apartment: location.state?.guid_apartment };
    dispatch(getListPhotoApartmentReq(send));
  };

  const clickImgs = (img) => {
    navigate('/every/crud_apartment_photo', { state: { imgs_list: listPhotosApartment, action_type: 2 } });
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider(
    listPhotosApartment?.length > 0
      ? {
          loop: true,
          slides: { perView: 1 },
          slideChanged: (s) => setCurrentSlide(s.track.details.rel)
        }
      : null
  );

  return (
    <div className="viewPhoto">
      <div className="viewPhoto__inner">
        <MainCard
          title={
            <div className="headerActionsImgs">
              <Titles title={'Фотографии квартиры'} />
              <button onClick={handleAddPhotosClick} className="standartBtn">
                Загрузить новое фото
              </button>
              <input type="file" accept="image/*" multiple style={{ display: 'none' }} ref={fileInputRef} onChange={handleFilesChange} />
            </div>
          }
        >
          {isSmall ? (
            <div className="slider-container">
              <div className="keen-slider" ref={sliderRef} style={{ maxWidth: '100%', margin: '0 auto' }}>
                {listPhotosApartment?.map((i, index) => (
                  <div key={index} className="keen-slider__slide">
                    <img src={i?.url} alt={`img-${index}`} />
                    <button onClick={() => delPhotoFn(i)} className="delImg">
                      <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title="Удалить" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="dots">
                {listPhotosApartment?.map((_, idx) => (
                  <button key={idx} onClick={() => slider?.moveToIdx(idx)} className={`dot${currentSlide === idx ? ' active' : ''}`} />
                ))}
              </div>
            </div>
          ) : (
            <div className="viewPhoto__main">
              {listPhotosApartment?.length ? (
                <div className="photo_list">
                  {listPhotosApartment?.map((photo, index) => (
                    <div key={photo?.guid} className="photo-item">
                      <img src={photo?.url} alt="Фото квартиры" onClick={() => clickImgs(photo)} />
                      <button onClick={() => delPhotoFn(photo)} className="delImg">
                        <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title="Удалить" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="emptyDataList">Список пустой</p>
              )}
            </div>
          )}
        </MainCard>
      </div>
    </div>
  );
};

export default ViewPhotoApartmentPage;
