// hooks
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// fns
import { editTimeCleaningOrderReq } from 'store/reducers/orderSlice';

// components
import MainCard from 'ui-component/cards/MainCard';
import { DatePicker, ConfigProvider } from 'antd';

// helpers
import { myAlert } from 'helpers/myAlert';
import BtnSave from 'common/BtnSave/BtnSave';
import BtnCancel from 'common/BtnCancel/BtnCancel';

// styles
import './style.scss';

// icons

// date
import dayjs from 'dayjs';
import locale from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TitlesModal from 'common/TitlesModal/TitlesModal';
dayjs.extend(customParseFormat);
dayjs.locale('ru');

const CrudCleaningTimesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [crudData, setCrudData] = useState({
    dateStart: null,
    dateEnd: null
  });

  useEffect(() => {
    const start = location?.state?.cleaningStartTime;
    const end = location?.state?.cleaningEndTime;

    console.log(start, end, '← входящие значения');

    const startDate = dayjs(start, 'HH:mm DD.MM.YYYY', true);
    const endDate = dayjs(end, 'HH:mm DD.MM.YYYY', true);

    setCrudData({
      dateStart: startDate.isValid() ? startDate : null,
      dateEnd: endDate.isValid() ? endDate : null
    });
  }, [location?.state]);

  const saveDateCleaning = async () => {
    const { dateStart, dateEnd } = crudData;

    if (!dateStart || !dateEnd) {
      myAlert('Заполните оба поля даты и времени.', 'error');
      return;
    }

    if (dateStart.isAfter(dateEnd)) {
      myAlert('Время начала уборки не может быть позже времени окончания.', 'error');
      return;
    }

    const send = {
      cleaningStartTime: dateStart.add(6, 'hour').toISOString(),
      cleaningEndTime: dateEnd.add(6, 'hour').toISOString(),
      orderGuid: location?.state?.orderGuid
    };

    const result = await dispatch(editTimeCleaningOrderReq(send)).unwrap();
    if (result.res === 1) {
      myAlert(result.mes);
      navigate(-1);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  return (
    <div className="crudCleaning crudTableOrders tableOrders">
      <MainCard
        title={<TitlesModal title={'Продление уборки'} />}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <ConfigProvider locale={locale}>
          <div className="crudCleaning__inner">
            <div className="time_edit pos">
              <div className="myInputs">
                <h5>Начало уборки</h5>
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="DD.MM.YYYY HH:mm"
                  value={crudData.dateStart}
                  onChange={(value) => setCrudData({ ...crudData, dateStart: value })}
                  style={{ color: '#e7e7e7e0', width: '100%', background: '#222222 ', border: 'none' }}
                />
              </div>
            </div>

            <div className="time_edit pos2">
              <div className="myInputs">
                <h5>Конец уборки</h5>
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="DD.MM.YYYY HH:mm"
                  value={crudData.dateEnd}
                  onChange={(value) => setCrudData({ ...crudData, dateEnd: value })}
                  style={{ color: '#e7e7e7e0', width: '100%', background: '#222222 ', border: 'none' }}
                />
              </div>
            </div>

            <p className="info">Укажите дату и время — в этот период квартира будет недоступна для бронирования другим клиентам.</p>

            <div className="actionBtn">
              <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
              <BtnSave click={saveDateCleaning} text={'Сохранить'} />
            </div>
          </div>
        </ConfigProvider>
      </MainCard>
    </div>
  );
};

export default CrudCleaningTimesPage;
