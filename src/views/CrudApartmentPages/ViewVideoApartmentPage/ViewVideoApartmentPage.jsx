//////// hooks
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// components
import MainCard from 'ui-component/cards/MainCard';

////// icons

/////// fns
import { getVideoApartmentReq, loadVideoApartmentReq } from 'store/reducers/otherActionApartmentSlice';

/////// styles
import './style.scss';

/////// helpers
import { myAlert } from 'helpers/myAlert';

const ViewVideoApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { listVideoApartment } = useSelector((state) => state.otherActionApartmentSlice);
  const guid_apartment = location?.state?.guid_apartment;

  const fileInputRefs = useRef([]);

  useEffect(() => {
    if (guid_apartment) {
      dispatch(getVideoApartmentReq({ guid_apartment }));
    }
  }, [guid_apartment]);

  const handleOpenModal = (video) => {
    navigate('/every/view_every_apartment_video', { state: video });
  };

  const handleUpload = async (event, item, index) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('guid_apartment', guid_apartment);
    formData.append('type', item?.type);

    const result = await dispatch(loadVideoApartmentReq(formData)).unwrap();

    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = ''; // Сброс input
    }

    if (result.res === 1) {
      dispatch(getVideoApartmentReq({ guid_apartment }));
      myAlert(result.mes);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  return (
    <div className="videoApartmentPage">
      <MainCard title="Список видео квартиры" sx={{ height: '100%' }}>
        <table className="video-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Действия</th>
              <th>Загрузка</th>
            </tr>
          </thead>
          <tbody>
            {listVideoApartment?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.title}</td>
                <td>
                  {item?.video === '' ? (
                    <button onClick={() => fileInputRefs.current[index]?.click()} className="errorData">
                      Видео отсутствует
                    </button>
                  ) : (
                    <button onClick={() => handleOpenModal(item)}>Посмотреть видео</button>
                  )}
                </td>
                <td>
                  <input
                    type="file"
                    accept="video/*"
                    style={{ display: 'none' }}
                    ref={(el) => (fileInputRefs.current[index] = el)}
                    onChange={(e) => handleUpload(e, item, index)}
                  />
                  <button onClick={() => fileInputRefs.current[index]?.click()}>
                    {item?.video === '' ? 'Загрузить видео' : 'Загрузить новое видео'}
                  </button>
                </td>
              </tr>
            ))}

            {listVideoApartment?.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  Видео не добавлено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </MainCard>
    </div>
  );
};

export default ViewVideoApartmentPage;
