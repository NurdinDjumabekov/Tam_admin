import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

import MainCard from 'ui-component/cards/MainCard';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';
import Modal from '@mui/material/Modal';
import Slider from 'react-slick';

import './style.scss';
import { myAlert } from 'helpers/myAlert';
import { delPhotoApartmentReq, getListPhotoApartmentReq, loadPhotoApartmentReq } from 'store/reducers/otherActionApartmentSlice';
import Titles from 'common/Titles/Titles';

const CrudPhotoApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [del, setDel] = useState({});
  const [sliderOpen, setSliderOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

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
    const result = await dispatch(delPhotoApartmentReq({ guid_photo: guid })).unwrap();
    if (result.res === 1) {
      myAlert('Изображение удалено успешно');
      getData();
      setDel({});
    }
  };

  const getData = () => {
    const send = { guid_apartment: location.state?.guid_apartment };
    dispatch(getListPhotoApartmentReq(send));
  };

  const handleImageClick = (index) => {
    setActiveIndex(index);
    setSliderOpen(true);
  };

  useEffect(() => {
    if (sliderOpen && sliderRef.current) {
      setTimeout(() => {
        sliderRef.current?.slickGoTo(activeIndex, true);
        sliderRef.current?.slickPlay(); // иногда помогает
        sliderRef.current?.innerSlider?.onWindowResized(); // перерисовка
      }, 100); // время важно, лучше 100–200мс
    }
  }, [sliderOpen]);

  const CustomPrevArrow = (props) => {
    const { onClick, closeModal } = props;
    return (
      <button
        className="custom-arrow prev"
        onClick={() => {
          onClick?.();
          closeModal();
        }}
      >
        <ArrowBackIcon />
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick, closeModal } = props;
    return (
      <button
        className="custom-arrow next"
        onClick={() => {
          onClick?.();
          closeModal();
        }}
      >
        <ArrowForwardIcon />
      </button>
    );
  };

  return (
    <div className="viewPhoto">
      <MainCard
        title={
          <>
            <div className="headerActionsStandart">
              <Titles title={'Фотографии квартиры'} />
              <button onClick={handleAddPhotosClick} className="standartBtn">
                Добавить
              </button>
              <input type="file" accept="image/*" multiple style={{ display: 'none' }} ref={fileInputRef} onChange={handleFilesChange} />
            </div>
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="crud_apartment_page__inner">
          {listPhotosApartment?.length ? (
            <div className="photo-grid">
              {listPhotosApartment.map((photo, index) => (
                <div key={photo?.guid} className="photo-item">
                  <img src={photo?.url} alt="Фото квартиры" onClick={() => handleImageClick(index)} />
                  <button onClick={() => setDel(photo)} className="delImg">
                    <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title="Удалить" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="emptyDataList">Список пустой</p>
          )}
        </div>
      </MainCard>

      {/* <Modal open={sliderOpen} onClose={() => setSliderOpen(false)}>
        <div className="slider-modal-photo-apartment">
          <button className="closeSlider" onClick={() => setSliderOpen(false)}>
            <CloseIcon />
          </button>
          <Slider
            ref={sliderRef}
            infinite={false}
            dots={true}
            arrows={true}
            initialSlide={activeIndex}
            prevArrow={<CustomPrevArrow closeModal={() => setSliderOpen(false)} />}
            nextArrow={<CustomNextArrow closeModal={() => setSliderOpen(false)} />}
          >
            {listPhotosApartment?.map((photo) => (
              <div key={photo?.guid} className="everySliderPhotoApartment">
                <img src={photo?.url} alt="Фото квартиры" className="slider-img" />
              </div>
            ))}
          </Slider>
        </div>
      </Modal> */}

      <ConfirmModal state={!!del?.guid} title={`Удалить изображение ?`} yesFN={() => delPhotoFn(del)} noFN={() => setDel({})} />
    </div>
  );
};

export default CrudPhotoApartmentPage;
