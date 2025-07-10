// hooks
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// fns
import { editLockOrderReq } from 'store/reducers/lockSlice';

// components
import MainCard from 'ui-component/cards/MainCard';
import SendInput from 'common/SendInput/SendInput';
import { DatePicker, ConfigProvider } from 'antd';

// helpers
import { myAlert } from 'helpers/myAlert';

// styles
import './style.scss';

// icons
import AddBoxIcon from '@mui/icons-material/AddBox';

// date
import dayjs from 'dayjs';
import locale from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';
import TitlesModal from 'common/TitlesModal/TitlesModal';
dayjs.extend(customParseFormat);
dayjs.locale('ru');

//// меняю время пароля и его код (временный пароль)
const CrudPasswordLockOrderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [crudData, setCrudData] = useState({
    dateStart: null,
    dateEnd: null
  });

  useEffect(() => {
    const start = location?.state?.startTime;
    const end = location?.state?.endTime;

    const startDate = dayjs(start, 'HH:mm DD.MM.YYYY', true);
    const endDate = dayjs(end, 'HH:mm DD.MM.YYYY', true);

    setCrudData({
      dateStart: startDate.isValid() ? startDate : null,
      dateEnd: endDate.isValid() ? endDate : null,
      lockCode: location?.state?.lockCode
    });
  }, [location?.state]);

  const saveLockPassword = async () => {
    const { dateStart, dateEnd } = crudData;

    if (!dateStart || !dateEnd) {
      myAlert('Заполните оба поля даты и времени.', 'error');
      return;
    }

    if (dateStart.isAfter(dateEnd)) {
      myAlert('Время начала работы пароля не может быть позже времени окончания.', 'error');
      return;
    }

    if (crudData?.lockCode?.length < 6) {
      myAlert('Пароль должен состоять из 6ти цифр', 'error');
      return;
    }

    const send = {
      startTime: dateStart.add(6, 'hour').toISOString(),
      endTime: dateEnd.add(6, 'hour').toISOString(),
      orderGuid: location?.state?.orderGuid,
      lockCodeId: location?.state?.lockCodeId,
      lockCode: crudData?.lockCode
    };

    const result = await dispatch(editLockOrderReq(send)).unwrap();
    if (result.res === 1) {
      myAlert(result.mes);
      navigate(-1);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const onlyDigits = value?.replace(/\D/g, '').slice(0, 8);
    setCrudData({ ...crudData, [name]: onlyDigits });
  };

  return (
    <div className="crudPassword">
      <MainCard
        title={<TitlesModal title={'Редактирование временного пароля'} />}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <ConfigProvider locale={locale}>
          <div className="crudCleaning__inner">
            <div className="time_edit ">
              <div className="myInputs">
                <h5>Укажите время начала работы пароля</h5>
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="DD.MM.YYYY HH:mm"
                  value={crudData?.dateStart}
                  onChange={(value) => setCrudData({ ...crudData, dateStart: value })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div className="time_edit push">
              <div className="myInputs">
                <h5>Укажите время конца работы пароля</h5>
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="DD.MM.YYYY HH:mm"
                  value={crudData?.dateEnd}
                  onChange={(value) => setCrudData({ ...crudData, dateEnd: value })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <SendInput
              required={true}
              value={crudData?.lockCode}
              onChange={onChange}
              title={'Временный пароль для замка (пример: 876456)'}
              name={'lockCode'}
              type={'number'}
            />

            <p className="info">
              Рекомендуется вводить пароль в самом конце редактирование заказа, если вы добавите новый тариф, то время пароля и сам пароль
              могут поменяться
            </p>

            <div className="actionBtn">
              <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
              <BtnSave click={saveLockPassword} text={'Сохранить'} />
            </div>
          </div>
        </ConfigProvider>
      </MainCard>
    </div>
  );
};

export default CrudPasswordLockOrderPage;
