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
import Titles from 'common/Titles/Titles';

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
        title={<Titles title={`Замок (${location?.state?.address})`} />}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="crud_apartment_page__inner">
          <form className="crudUsers">
            <div className="myInputs selectCategs">
              <h5>Выберите аккаунт привязанный к замку</h5>
              <Select
                options={listLockAdmin}
                className="select"
                onChange={onChangeWS}
                name="account_admin"
                value={crudData?.account_admin}
                menuPortalTarget={document.body}
                styles={{
                  container: (base) => ({
                    ...base,
                    width: 170,
                    minHeight: 32,
                    height: 32
                  }),
                  control: (base) => ({
                    ...base,
                    minHeight: 32,
                    height: 32,
                    padding: 0,
                    backgroundColor: '#1e1e1e',
                    borderColor: '#ffffff24',
                    color: '#ffffff24'
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    height: 32,
                    padding: '0 8px 8px 8px',
                    display: 'flex',
                    alignItems: 'center'
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: 32
                  }),
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#2172ef' : state.isFocused ? '#2a2a2a' : 'transparent',
                    color: state.isSelected ? '#e0e0e0' : '#e0e0e0',
                    cursor: 'pointer'
                  }),

                  singleValue: (base) => ({
                    ...base,
                    color: '#9e9e9e',
                    fontSize: '12px',
                    lineHeight: '16px'
                  }),
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
            <SendInput required={true} value={crudData?.id_lock} onChange={onChange} title={'Укажите id замка'} name={'id_lock'} />
            <SendInput
              required={true}
              value={crudData?.lockCodeStandart}
              onChange={onChange}
              title={'Постоянный пароль для замка (пример: 876456)'}
              name={'lockCodeStandart'}
              type={'number'}
            />
            <button onClick={saveDataLock} className="standartBtn">
              Сохранить
            </button>
          </form>
        </div>
      </MainCard>
    </div>
  );
};

export default ViewLockApartmentPage;
