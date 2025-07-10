////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

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
import { listBollean, listPrice } from 'helpers/myLocal';
import { myAlert } from 'helpers/myAlert';

////// fns
import { crudPriceApartmentReq } from 'store/reducers/otherActionApartmentSlice';

//// список пользователей
const CrudPriceApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [crudData, setCrudData] = useState({});

  useEffect(() => {
    getData();
    return () => setCrudData({});
  }, [location.state.guid_apartment]);

  const crudLandLordFn = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    const sendData = {
      ...crudData,
      guid: location.state?.guid,
      price: crudData?.price?.toString(),
      viewFordopList: crudData?.viewFordopList?.value === 'true',
      name: crudData?.name?.label,
      discount: Number(parseFloat(crudData?.discount).toFixed(1)) || 0.0,
      duration: crudData?.name?.value,
      durationInMinutes: +crudData?.name?.value * 60,
      status: true,
      type: '1',
      action_type: location.state?.action_type,
      apartmentId: location.state?.guid_apartment
    };

    const result = await dispatch(crudPriceApartmentReq(sendData)).unwrap();
    if (result.res == 1) {
      setCrudData({});
      myAlert(result.mes);
      if (location.state.nav == 1) navigate(-1);
      else navigate(-2);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'discount') {
      const onlyDigits = value.replace(/\D/g, '').slice(0, 6);
      setCrudData({ ...crudData, [name]: onlyDigits });
    } else {
      setCrudData({ ...crudData, [name]: value });
    }
  };

  const onChangeWS = (status, { name }) => {
    setCrudData({ ...crudData, [name]: status });
  };

  const getData = async () => {
    if (location.state?.action_type == 1) {
      setCrudData({ viewFordopList: listBollean?.[1] });
    } else if (location.state?.action_type == 2 || location.state?.action_type == 3) {
      const viewFordopList = listBollean?.find((i) => i.value == location.state?.viewFordopList?.toString());
      const name_new = listPrice?.find((i) => i?.value == location.state?.duration);

      setCrudData({
        name: name_new,
        price: +location.state?.price,
        duration: location.state?.duration,
        durationInMinutes: location.state?.durationInMinutes,
        status: true,
        discount: location.state?.discount,
        apartmentId: location.state?.guid_apartment,
        type: location.state?.type,
        action_type: location.state?.action_type,
        viewFordopList: viewFordopList
      });
    }
  };

  if (location.state.action_type == 3) {
    return (
      <ConfirmModal state={location.state.action_type == 3} title={`Удалить прайс ?`} yesFN={crudLandLordFn} noFN={() => navigate(-1)} />
    );
  }

  const objtitle = { 1: 'Создание нового прайса', 2: 'Редактирование прайса' };
  return (
    <div className="crud_apartment_page crudPrice">
      <MainCard
        title={objtitle?.[location.state?.action_type]}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="crud_apartment_page__inner">
          <form className="crudUsers" onSubmit={crudLandLordFn}>
            <div className="myInputs selectCategs">
              <h5>Выберите тариф</h5>
              <Select
                options={listPrice}
                className="select"
                onChange={onChangeWS}
                name="name"
                value={crudData?.name}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                required={true}
              />
            </div>

            <SendInput
              required={true}
              value={crudData?.price}
              onChange={onChange}
              title={'Цена за тариф в сомах (например 200)'}
              name={'price'}
              type="number"
            />

            <SendInput
              value={crudData?.discount}
              onChange={onChange}
              title={'Скидка (указывать цену, а не процент), можно просто оставить пустым'}
              name={'discount'}
              type="number"
            />

            <div className="myInputs selectCategs">
              <h5>Отображать только при продлении? (в основном списке его не будет)</h5>
              <Select
                options={listBollean}
                className="select"
                onChange={onChangeWS}
                name="viewFordopList"
                value={crudData?.viewFordopList}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                required={true}
              />
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

export default CrudPriceApartmentPage;
