////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/system';

/////// fns
import { crudApartmentReq, getAllSelectsReq, getEveryApartmentsReq } from 'store/reducers/apartmentsSlice';

/////// icons
import AddIcon from '@mui/icons-material/Add';

////// components
import MainCard from 'ui-component/cards/MainCard';
import SendInput from 'common/SendInput/SendInput';
import Titles from 'common/Titles/Titles';
import DelAlert from 'common/DelAlert/DelAlert';
import MySelect from 'common/MySelect/MySelect';

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
  const isSmall = useMediaQuery('(max-width:550px)');
  const isSmall650 = useMediaQuery('(max-width:650px)');

  const { dataSelects } = useSelector((state) => state.apartmentsSlice);

  const [crudLandlord, setCrudLandlord] = useState({});

  useEffect(() => {
    getData();
    return () => setCrudLandlord({});
  }, [location?.state?.guid_apartment]);

  const crudLandLordFn = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!crudLandlord?.status) {
      return myAlert('Выберите статус квартиры', 'error');
    }

    if (!crudLandlord?.type_apartment) {
      return myAlert('Выберите вид недвижимости', 'error');
    }

    if (crudLandlord?.city == '' || !crudLandlord?.city) {
      return myAlert('Заполните город', 'error');
    }

    if (crudLandlord?.district == '' || !crudLandlord?.district) {
      return myAlert('Заполните район', 'error');
    }

    if (crudLandlord?.address_name == '' || !crudLandlord?.address_name) {
      return myAlert('Заполните улицу', 'error');
    }

    if (crudLandlord?.description == '' || !crudLandlord?.description) {
      return myAlert('Заполните описание', 'error');
    }

    if (crudLandlord?.more_info == '' || !crudLandlord?.more_info) {
      return myAlert('Заполните доп информацию', 'error');
    }

    if (!crudLandlord?.count_room) {
      return myAlert('Выберите количество комнат', 'error');
    }

    if (!crudLandlord?.categ_apartment) {
      return myAlert('Выберите категорию квартиры', 'error');
    }

    if (crudLandlord?.square == '' || !crudLandlord?.square) {
      return myAlert('Заполните квадратуру (м²)', 'error');
    }

    if (crudLandlord?.house_number == '' || !crudLandlord?.house_number) {
      return myAlert('Заполните номер квартиры', 'error');
    }

    if (crudLandlord?.all_floor == '' || !crudLandlord?.all_floor) {
      return myAlert('Заполните общее кол-во этажей в квартире', 'error');
    }

    if (crudLandlord?.floor == '' || !crudLandlord?.floor) {
      return myAlert('Заполните поле на котором указывается на каком этаже находится квартира', 'error');
    }

    if (crudLandlord?.apartment_number == '' || !crudLandlord?.apartment_number) {
      return myAlert('Заполните номер здания', 'error');
    }

    if (!crudLandlord?.install_lock) {
      return myAlert("Выберите поле 'Устанавливается ли замок ?'", 'error');
    }

    const sendData = {
      ...crudLandlord,
      action_type: location?.state?.action_type,
      guid: location?.state?.guid_apartment,
      guid_landlord: location?.state?.guid_landlord,
      position_apartment: 0,
      name_apartment: '',
      apartment_category: crudLandlord?.categ_apartment?.value,
      count_room: crudLandlord?.count_room?.value,
      install_lock: crudLandlord?.install_lock?.value == 'true',
      status: crudLandlord?.status?.value,
      type_apartment: crudLandlord?.type_apartment?.value,
      all_floor: Number(crudLandlord?.all_floor),
      floor: Number(crudLandlord?.floor),
      house_number: String(crudLandlord?.house_number),
      apartment_number: String(crudLandlord?.apartment_number),
      square: String(crudLandlord?.square)
    };

    const result = await dispatch(crudApartmentReq(sendData)).unwrap();

    if (result.res == 1) {
      setCrudLandlord({});
      myAlert(result.mes);
      navigate(-1);
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

  if (location?.state?.action_type == 3) {
    return (
      <DelAlert
        title={'Удаление квартиры'}
        text={'Вы действительно хотите удалить данные квартиры? Этот процесс не обратим и одноразовый !'}
        yesText={'Удалить'}
        noText={'Отмена'}
        click={crudLandLordFn}
      />
    );
  }

  const objtitle = { 1: 'Создание квартиры', 2: 'Редактирование квартиры' };
  const objBtns = { 1: 'Добавить квартиру', 2: 'Сохранить квартиру' };
  return (
    <div className="crud_apartment_page">
      <MainCard
        title={
          <div className="actionHeader">
            <Titles title={objtitle?.[location.state?.action_type]} />
            {!isSmall && (
              <button onClick={crudLandLordFn} className="standartBtn">
                {isSmall650 ? <AddIcon sx={{ width: 19, height: 19 }} /> : objBtns?.[location.state?.action_type]}
              </button>
            )}
          </div>
        }
      >
        <div className="crud_apartment_page__inner">
          <form className="crudUsers">
            <div>
              <MySelect
                value={crudLandlord?.status}
                onChangeWS={onChangeWS}
                list={listActiveApartment}
                title={'Статус квартиры'}
                name={'status'}
              />

              <MySelect
                value={crudLandlord?.type_apartment}
                onChangeWS={onChangeWS}
                list={dataSelects?.list_type_apartment}
                title={'Вид недвижимости'}
                name={'type_apartment'}
              />

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
              <MySelect
                value={crudLandlord?.count_room}
                onChangeWS={onChangeWS}
                list={listCountApartnment}
                title={'Количество комнат'}
                name={'count_room'}
              />

              <MySelect
                value={crudLandlord?.categ_apartment}
                onChangeWS={onChangeWS}
                list={dataSelects?.list_categ_apartment}
                title={'Категория квартиры'}
                name={'categ_apartment'}
              />

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

              <MySelect
                value={crudLandlord?.install_lock}
                onChangeWS={onChangeWS}
                list={listBollean}
                title={'Устанавливается ли замок ?'}
                name={'install_lock'}
              />
            </div>

            {isSmall && (
              <button onClick={crudLandLordFn} className="standartBtn saveBottom">
                <AddIcon sx={{ width: 19, height: 19 }} />
                <p>{objBtns?.[location.state?.action_type]}</p>
              </button>
            )}
          </form>
        </div>
      </MainCard>
    </div>
  );
};

export default CrudMainApartmentPage;
