import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// styles
import './style.scss';

/////// fns

////// helpers
import { listStatusOrderForAdmin, listStatusOrderForStart } from 'helpers/myLocal';
import { myAlert } from 'helpers/myAlert';

////// components
import MainCard from 'ui-component/cards/MainCard';
import Select from 'react-select';
import { DatePicker } from 'antd';

////// icons

// date
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getListPriceReq } from 'store/reducers/otherActionApartmentSlice';
import SendInput from 'common/SendInput/SendInput';
import { createOrderForLandlord } from 'store/reducers/orderSlice';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';
import TitlesModal from 'common/TitlesModal/TitlesModal';
import { getListApartmentsReq } from 'store/reducers/apartmentsSlice';
dayjs.extend(customParseFormat);
dayjs.locale('ru');

const CreateOrdersLandlordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { listApartments } = useSelector((state) => state.apartmentsSlice);

  const now = dayjs();
  const [crudData, setCrudData] = React.useState({ dateStart: now, cleaningEndTime: now });

  useEffect(() => {
    getData();
  }, [location?.state?.guidApartment]);

  const getData = async () => {
    const guid_apartment = location?.state?.guidApartment;
    const obj = { guid_apartment, extend: true };
    const sel = await dispatch(getListPriceReq(obj)).unwrap();
    const new_list = sel?.map((i) => ({ ...i, value: i?.guid, label: i?.name }));
    const sel_user = await dispatch(getListApartmentsReq({ guidLandlord: location?.state?.guidUser })).unwrap();
    const new_list_user = sel_user?.map((i) => ({ ...i, value: i?.guid, label: i?.address }));

    const selected = new_list?.[0];
    const now = dayjs();

    setCrudData({
      ...crudData,
      tariff: selected,
      dateStart: now,
      cleaningEndTime: now.add(selected?.duration, 'hour').add(59, 'minute'),
      status: listStatusOrderForStart?.[2],
      guidApartment: new_list_user?.[0]
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudData({ ...crudData, [name]: value });
  };

  const onChangeWS = (status, { name }) => {
    setCrudData({ ...crudData, [name]: status });
  };

  const createOrderFn = async () => {
    const { dateStart, cleaningEndTime, price } = crudData;

    if (!dateStart || !cleaningEndTime) {
      return myAlert('Пожалуйста, заполните все поля дат и времени', 'error');
    }

    if (dayjs(cleaningEndTime).isBefore(dayjs(dateStart))) {
      return myAlert('Время окончания не может быть раньше начала', 'error');
    }

    if (!price || price == 0) {
      return myAlert('Пожалуйста, заполните цену', 'error');
    }

    const send = {
      ...crudData,
      guidUser: location?.state?.guidUser,
      commentLandlord: crudData?.commentLandlord || '',
      commentAdmin: crudData?.commentAdmin || '',
      statusOrder: crudData?.status?.value,
      dateStart: dayjs(dateStart).format('YYYY-MM-DD HH:mm'),
      cleaningEndTime: dayjs(cleaningEndTime).format('YYYY-MM-DD HH:mm'),
      guidApartment: crudData?.guidApartment?.value,
      guidTariff: crudData?.tariff?.guid
    };

    const result = await dispatch(createOrderForLandlord(send)).unwrap();
    if (result.res === 1) {
      myAlert(result.mes);
      navigate('/list/orders');
    } else {
      myAlert(result.mes, 'error');
    }
  };

  return (
    <div className="tableOrders crudTableOrders createOrdersAdmin createOrdersLandlord">
      <MainCard
        title={
          <>
            <TitlesModal title={`Создание бронирования (${location?.state?.label}) `} />
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="orderTableWrapper">
          <div className="myInputs selectCategs">
            <h5>Статус</h5>
            <Select
              options={listStatusOrderForAdmin}
              className="select"
              onChange={onChangeWS}
              name="status"
              value={crudData?.status}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2172ef' : state.isFocused ? '#2a2a2a' : 'transparent',
                  color: state.isSelected ? '#fff' : '#e0e0e0',
                  cursor: 'pointer'
                }),
                control: (base) => ({
                  ...base,
                  backgroundColor: '#111',
                  borderColor: '#2172ef',
                  color: '#fff'
                }),
                singleValue: (base) => ({ ...base, color: '#fff' }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#333333',
                  borderRadius: 8,
                  overflow: 'hidden'
                })
              }}
              required={true}
            />
          </div>

          <div className="myInputs selectCategs">
            <h5>Выберите квартиру</h5>
            <Select
              options={listApartments}
              className="select"
              onChange={onChangeWS}
              name="guidApartment"
              value={crudData?.guidApartment}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2172ef' : state.isFocused ? '#2a2a2a' : 'transparent',
                  color: state.isSelected ? '#fff' : '#e0e0e0',
                  cursor: 'pointer'
                }),
                control: (base) => ({
                  ...base,
                  backgroundColor: '#111',
                  borderColor: '#2172ef',
                  color: '#fff'
                }),
                singleValue: (base) => ({ ...base, color: '#fff' }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#333333',
                  borderRadius: 8,
                  overflow: 'hidden'
                })
              }}
              required={true}
            />
          </div>

          <div className="time_edit pos">
            <div className="myInputs myInputsMargin">
              <h5>Начало аренды</h5>
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="DD.MM.YYYY HH:mm"
                placeholder=""
                value={crudData?.dateStart}
                onChange={(e) => setCrudData({ ...crudData, dateStart: e })}
                style={{ color: '#e7e7e7e0', width: '100%', background: '#222222 ', border: 'none' }}
              />
            </div>
          </div>

          <div className="time_edit pos2">
            <div className="myInputs myInputsMargin">
              <h5>Конец аренды (включая уборку)</h5>
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="DD.MM.YYYY HH:mm"
                placeholder=""
                value={crudData?.cleaningEndTime}
                onChange={(e) => setCrudData({ ...crudData, cleaningEndTime: e })}
                style={{ color: '#e7e7e7e0', width: '100%', background: '#222222 ', border: 'none' }}
              />
            </div>
          </div>

          <div className="priceOrder">
            <SendInput
              required={true}
              value={crudData?.price}
              onChange={onChange}
              title={'Цена услуги (например 2500)'}
              name={'price'}
              type={'number'}
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

export default CreateOrdersLandlordPage;
