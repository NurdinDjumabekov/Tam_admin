//////// hooks
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// components
import MainCard from 'ui-component/cards/MainCard';
import SendInput from 'common/SendInput/SendInput';
import Select from 'react-select';

/////// icons
import AddBoxIcon from '@mui/icons-material/AddBox';

/////// fns
import { editDataLockReq, getListAdminsLockReq } from 'store/reducers/lockSlice';

/////// styles
import './style.scss';

/////// helpers
import { myAlert } from 'helpers/myAlert';

const ViewLockApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [crudData, setCrudData] = useState({});

  const { listLockAdmin } = useSelector((state) => state.lockSlice);

  useEffect(() => {
    getData();
  }, [location?.state?.guid_apartment]);

  const getData = async () => {
    const list = await dispatch(getListAdminsLockReq()).unwrap();
    if (!!location?.state?.adminGuid) {
      const account_admin = list?.find((i) => i?.value == location?.state?.adminGuid);
      setCrudData({ account_admin, id_lock: location?.state?.lockServiceNumber, lockCodeStandart: location?.state?.code_lock_standart });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name == 'lockCodeStandart') {
      const onlyDigits = value.replace(/\D/g, '').slice(0, 8);
      setCrudData({ ...crudData, [name]: onlyDigits });
    } else {
      setCrudData({ ...crudData, [name]: value });
    }
  };

  const onChangeWS = (status, { name }) => {
    setCrudData({ ...crudData, [name]: status });
  };

  const saveDataLock = async (e) => {
    e.preventDefault();

    if (crudData?.lockCodeStandart?.length < 6) {
      myAlert('Пароль должен состоять из 6ти цифр', 'error');
      return;
    }

    const sendData = {
      ...crudData,
      account_admin: crudData?.account_admin?.value,
      guid_apartment: location?.state?.guid_apartment
    };

    const result = await dispatch(editDataLockReq(sendData)).unwrap();

    if (result.res == 1) {
      setCrudData({});
      myAlert(result.mes);
      if (location.state.nav == 1) navigate(-1);
      else navigate(-2);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  return (
    <div className="crud_apartment_page crudPrice viewLockApartmentPage">
      <MainCard
        title={`Замок (${location?.state?.address})`}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="crud_apartment_page__inner">
          <form className="crudUsers" onSubmit={saveDataLock}>
            <div className="myInputs selectCategs">
              <h5>Выберите аккаунт привязанный к замку</h5>
              <Select
                options={listLockAdmin}
                className="select"
                onChange={onChangeWS}
                name="account_admin"
                value={crudData?.account_admin}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                required={true}
              />
            </div>
            <SendInput required={true} value={crudData?.id_lock} onChange={onChange} title={'Укажите id замка'} name={'id_lock'} />
            <SendInput
              required={true}
              value={crudData?.lockCodeStandart}
              onChange={onChange}
              title={'Постоянный пароль для замка (пример: 876456)'}
              name={'lockCodeStandart'}
              type={'number'}
            />
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

export default ViewLockApartmentPage;
