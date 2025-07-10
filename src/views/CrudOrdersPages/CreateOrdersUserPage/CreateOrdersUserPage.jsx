import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// styles
import './style.scss';

/////// fns

////// helpers
import { listStatusOrderForStart } from 'helpers/myLocal';
import { myAlert } from 'helpers/myAlert';

////// components
import MainCard from 'ui-component/cards/MainCard';
import Select from 'react-select';
import { DatePicker } from 'antd';

////// icons
import Titles from 'common/Titles/Titles';

// date
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getListPriceReq } from 'store/reducers/otherActionApartmentSlice';
import SendInput from 'common/SendInput/SendInput';
import { createOrderAdmin } from 'store/reducers/orderSlice';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';
dayjs.extend(customParseFormat);
dayjs.locale('ru');

const CreateOrdersUserPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const now = dayjs();
  const [crudData, setCrudData] = React.useState({ dateStart: now, dateEnd: now, cleaningStartTime: now, cleaningEndTime: now });

  const { listPrices } = useSelector((state) => state.otherActionApartmentSlice);

  useEffect(() => {
    getData();
  }, [location?.state?.guidApartment]);

  const getData = async () => {
    const guid_apartment = location?.state?.guidApartment;
    const obj = { guid_apartment, extend: true };
    const sel = await dispatch(getListPriceReq(obj)).unwrap();
    const new_list = sel?.map((i) => ({ ...i, value: i?.guid, label: i?.name }));
    const now = dayjs();
    const selected = new_list?.[0];

    setCrudData({
      ...crudData,
      tariff: selected,
      dateStart: now,
      dateEnd: now.add(selected?.duration, 'hour'),
      cleaningStartTime: now.add(selected?.duration, 'hour').add(10, 'minute'),
      cleaningEndTime: now.add(selected?.duration, 'hour').add(59, 'minute'),
      status: listStatusOrderForStart?.[2]
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudData({ ...crudData, [name]: value });
  };

  const onChangeWS = (status, { name }) => {
    if (name === 'tariff') {
      const base = dayjs(crudData?.dateStart); // используем текущее выбранное начало аренды
      const duration = +status?.duration;

      setCrudData({
        ...crudData,
        tariff: status,
        dateStart: base,
        dateEnd: base.add(duration, 'hour'),
        cleaningStartTime: base.add(duration, 'hour').add(10, 'minute'),
        cleaningEndTime: base.add(duration, 'hour').add(59, 'minute')
      });
    } else {
      setCrudData({ ...crudData, [name]: status });
    }
  };

  const createOrderFn = async () => {
    if (!crudData?.tariff) return myAlert('Выберите тариф', 'error');
    if (!crudData?.status) return myAlert('Выберите статус', 'error');

    const { dateStart, dateEnd, cleaningStartTime, cleaningEndTime } = crudData;

    if (!dateStart || !dateEnd || !cleaningStartTime || !cleaningEndTime) {
      return myAlert('Пожалуйста, заполните все поля дат и времени', 'error');
    }

    if (dayjs(dateEnd).isBefore(dayjs(dateStart))) {
      return myAlert('Время окончания аренды не может быть раньше начала', 'error');
    }

    if (dayjs(cleaningEndTime).isBefore(dayjs(cleaningStartTime))) {
      return myAlert('Время окончания уборки не может быть раньше начала', 'error');
    }

    const send = {
      ...crudData,
      guidTariff: crudData?.tariff?.guid,
      guidApartment: location?.state?.guidApartment,
      guidUser: location?.state?.guidUser,
      commentAdmin: crudData?.commentAdmin || '',
      statusOrder: crudData?.status?.value,

      dateStart: dayjs(dateStart).format('YYYY-MM-DD HH:mm'),
      dateEnd: dayjs(dateEnd).format('YYYY-MM-DD HH:mm'),
      cleaningStartTime: dayjs(cleaningStartTime).format('YYYY-MM-DD HH:mm'),
      cleaningEndTime: dayjs(cleaningEndTime).format('YYYY-MM-DD HH:mm')
    };

    const result = await dispatch(createOrderAdmin(send)).unwrap();
    if (result.res === 1) {
      myAlert(result.mes);
      navigate('/list/orders');
    } else {
      myAlert(result.mes, 'error');
    }
  };

  return (
    <div className=" tableOrders crudTableOrders createOrdersAdmin">
      <MainCard
        title={
          <>
            <Titles
              title={`Создание бронирования (${location?.state?.typeCreateOrder?.label}: ${location?.state?.label}) квартира №${location?.state?.id}`}
            />
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="orderTableWrapper">
          <div className="myInputs selectCategs">
            <h5>Выберите тариф</h5>
            <Select
              options={listPrices}
              className="select"
              onChange={onChangeWS}
              name="tariff"
              value={crudData?.tariff}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              required={true}
            />
          </div>

          <div className="myInputs selectCategs">
            <h5>Статус</h5>
            <Select
              options={listStatusOrderForStart}
              className="select"
              onChange={onChangeWS}
              name="status"
              value={crudData?.status}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              required={true}
            />
          </div>

          {/* <div className="time_edit pos">
            <div className="myInputs myInputsMargin">
              <h5>Начало аренды</h5>
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="DD.MM.YYYY HH:mm"
                placeholder=""
                value={crudData?.dateStart}
                onChange={(value) => setCrudData({ ...crudData, dateStart: value })}
                style={{ width: '100%' }}
              />
            </div>
          </div> */}

          <div className="time_edit pos">
            <div className="myInputs myInputsMargin">
              <h5>Начало аренды</h5>
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="DD.MM.YYYY HH:mm"
                placeholder=""
                value={crudData?.dateStart}
                onChange={(value) => {
                  if (!value || !crudData?.tariff?.duration) return;
                  const duration = +crudData?.tariff?.duration;
                  const dateEnd = value.add(duration, 'hour');
                  const cleaningStart = dateEnd.add(10, 'minute');
                  const cleaningEnd = dateEnd.add(59, 'minute');
                  setCrudData({
                    ...crudData,
                    dateStart: value,
                    dateEnd,
                    cleaningStartTime: cleaningStart,
                    cleaningEndTime: cleaningEnd
                  });
                }}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className="time_edit pos2">
            <div className="myInputs myInputsMargin">
              <h5>Конец аренды</h5>
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="DD.MM.YYYY HH:mm"
                placeholder=""
                value={crudData?.dateEnd}
                onChange={(value) => setCrudData({ ...crudData, dateEnd: value })}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className="time_edit pos">
            <div className="myInputs myInputsMargin">
              <h5>Начало уборки</h5>
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="DD.MM.YYYY HH:mm"
                placeholder=""
                value={crudData?.cleaningStartTime}
                onChange={(value) => setCrudData({ ...crudData, cleaningStartTime: value })}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className="time_edit pos2">
            <div className="myInputs myInputsMargin">
              <h5>Конец уборки</h5>
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="DD.MM.YYYY HH:mm"
                placeholder=""
                value={crudData?.cleaningEndTime}
                onChange={(value) => setCrudData({ ...crudData, cleaningEndTime: value })}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className="textCommentAdmin">
            <SendInput
              required={true}
              value={crudData?.commentAdmin}
              onChange={onChange}
              title={'Комментарий админа'}
              name={'commentAdmin'}
              typeInput={'textarea'}
            />
          </div>

          <div className="actionBtn">
            <BtnCancel click={() => navigate('/list/orders')} text={'Отмена'} />
            <BtnSave click={createOrderFn} text={'Сохранить'} />
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default CreateOrdersUserPage;
