////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// fns
import { crudApartmentReq, getAllSelectsReq, getEveryApartmentsReq } from 'store/reducers/apartmentsSlice';

/////// icons
import AddBoxIcon from '@mui/icons-material/AddBox';

////// components
import MainCard from 'ui-component/cards/MainCard';
import Select from 'react-select';
import SendInput from 'common/SendInput/SendInput';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';

////// style
import './style.scss';

////// helpers && enums
import { listActiveApartment, listBollean, listCountApartnment } from 'helpers/myLocal';
import { myAlert } from 'helpers/myAlert';

//// список пользователей
const CrudMainApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { dataSelects } = useSelector((state) => state.apartmentsSlice);

  const [crudLandlord, setCrudLandlord] = useState({});

  useEffect(() => {
    getData();
    return () => setCrudLandlord({});
  }, [location?.state?.guid_apartment]);

  const crudLandLordFn = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    const sendData = {
      ...crudLandlord,
      action_type: location.state.action_type,
      guid: location.state.guid_apartment,
      guid_landlord: location.state.guid_landlord,
      position_apartment: 0,
      name_apartment: '',
      apartment_category: crudLandlord.categ_apartment?.value,
      count_room: crudLandlord.count_room?.value,
      install_lock: crudLandlord.install_lock?.value == 'true',
      status: crudLandlord.status?.value,
      type_apartment: crudLandlord.type_apartment?.value,
      all_floor: Number(crudLandlord.all_floor),
      floor: Number(crudLandlord.floor),
      house_number: String(crudLandlord.house_number),
      apartment_number: String(crudLandlord.apartment_number),
      square: String(crudLandlord.square)
    };

    const result = await dispatch(crudApartmentReq(sendData)).unwrap();

    if (result.res == 1) {
      setCrudLandlord({});
      myAlert(result.mes);
      if (location.state.nav == 1) {
        navigate(-1);
      } else {
        navigate(-2);
      }
    } else {
      myAlert(result.mes, 'error');
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudLandlord({ ...crudLandlord, [name]: value });
  };

  const onChangeWS = (status, { name }) => {
    setCrudLandlord({ ...crudLandlord, [name]: status });
  };

  const getData = async () => {
    const list = await dispatch(getAllSelectsReq()).unwrap(); // get список стандартных данных для админки

    if (location.state?.action_type != 1) {
      const guid_apartment = location.state?.guid_apartment;
      const res = await dispatch(getEveryApartmentsReq({ guid_apartment })).unwrap();

      const type_apartment_label = list?.list_type_apartment?.find((i) => i.value === res?.type_apartment);

      const categ_apartment_label = list?.list_categ_apartment?.find((i) => i.value === res?.apartment_category);

      const count_room_label = listCountApartnment.find((i) => i.value === res?.count_room);

      const status_label = listActiveApartment.find((i) => i.value === res?.status);

      const copy = {
        ...res,
        status: status_label,
        type_apartment: type_apartment_label,
        categ_apartment: categ_apartment_label,
        count_room: count_room_label,
        install_lock: listBollean.find((i) => i.value == res?.install_lock?.toString())
      };

      setCrudLandlord(copy);
    }
  };

  if (location.state.action_type == 3) {
    return (
      <ConfirmModal state={location.state.action_type == 3} title={`Удалить квартиру ?`} yesFN={crudLandLordFn} noFN={() => navigate(-1)} />
    );
  }

  const objtitle = { 1: 'Создание квартиры', 2: 'Редактирование квартиры' };
  return (
    <div className="crud_apartment_page crudData tableBottomBtn mainCrudApartment">
      <MainCard
        title={objtitle?.[location.state?.action_type]}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="crud_apartment_page__inner">
          <form className="crudUsers" onSubmit={crudLandLordFn}>
            <div>
              <div className="myInputs selectCategs">
                <h5>Статус квартиры</h5>
                <Select
                  options={listActiveApartment}
                  className="select"
                  onChange={onChangeWS}
                  name="status"
                  value={crudLandlord?.status}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  required={true}
                />
              </div>
              <div className="myInputs selectCategs">
                <h5>Вид недвижимости</h5>
                <Select
                  options={dataSelects?.list_type_apartment}
                  className="select"
                  onChange={onChangeWS}
                  name="type_apartment"
                  value={crudLandlord?.type_apartment}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  required={true}
                />
              </div>
              <SendInput required={true} value={crudLandlord?.city} onChange={onChange} title={'Город'} name={'city'} />

              <SendInput
                required={true}
                value={crudLandlord?.district}
                onChange={onChange}
                title={'Район (Филармония)'}
                name={'district'}
              />

              <SendInput
                required={true}
                value={crudLandlord?.address_name}
                onChange={onChange}
                title={'Улица (ул. Панфилова)'}
                name={'address_name'}
              />

              <SendInput
                required={true}
                value={crudLandlord?.description}
                onChange={onChange}
                title={'Описание'}
                name={'description'}
                typeInput={'textarea'}
              />

              <SendInput
                required={true}
                value={crudLandlord?.more_info}
                onChange={onChange}
                title={'Доп информация для входа (виден только во время активной аренды)'}
                name={'more_info'}
                typeInput={'textarea'}
              />
            </div>
            <div>
              <div className="myInputs selectCategs">
                <h5>Количество комнат</h5>
                <Select
                  options={listCountApartnment}
                  className="select"
                  onChange={onChangeWS}
                  name="count_room"
                  value={crudLandlord?.count_room}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  required={true}
                />
              </div>

              <div className="myInputs selectCategs">
                <h5>Категория квартиры</h5>
                <Select
                  options={dataSelects?.list_categ_apartment}
                  className="select"
                  onChange={onChangeWS}
                  name="categ_apartment"
                  value={crudLandlord?.categ_apartment}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  required={true}
                />
              </div>

              <SendInput
                required={true}
                value={crudLandlord?.square}
                onChange={onChange}
                title={'Квадратура (м²)'}
                name={'square'}
                type="number"
              />

              <SendInput
                required={true}
                value={crudLandlord?.house_number}
                onChange={onChange}
                title={'Номер квартиры'}
                name={'house_number'}
                type="number"
              />

              <SendInput
                required={true}
                value={crudLandlord?.all_floor}
                onChange={onChange}
                title={'Всего этажей в квартире'}
                name={'all_floor'}
                type="number"
              />

              <SendInput
                required={true}
                value={crudLandlord?.floor}
                onChange={onChange}
                title={'Этаж на котором находится квартиры'}
                name={'floor'}
                type="number"
              />

              <SendInput
                required={true}
                value={crudLandlord?.apartment_number}
                onChange={onChange}
                title={'Номер здания'}
                name={'apartment_number'}
              />

              <div className="myInputs selectCategs">
                <h5>Устанавливается ли замок ?</h5>
                <Select
                  options={listBollean}
                  className="select"
                  onChange={onChangeWS}
                  name="install_lock"
                  value={crudLandlord?.install_lock}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  required={true}
                />
              </div>
            </div>

            <button className="createUser">
              <AddBoxIcon sx={{ width: 20, height: 20 }} />
              <p>Сохранить</p>
            </button>
          </form>
        </div>
      </MainCard>
    </div>
  );
};

export default CrudMainApartmentPage;
