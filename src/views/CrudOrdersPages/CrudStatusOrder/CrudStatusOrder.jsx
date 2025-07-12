// hooks
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// fns
import { crudStatusOrderReq } from 'store/reducers/orderSlice';

// components
import MainCard from 'ui-component/cards/MainCard';
import Select from 'react-select';
import TitlesModal from 'common/TitlesModal/TitlesModal';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';
import { ConfigProvider } from 'antd';

// helpers
import { myAlert } from 'helpers/myAlert';
import { listStatusOrder } from 'helpers/myLocal';

// date
import locale from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';

// styles
import './style.scss';

const CrudStatusOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [crudData, setCrudData] = useState({});

  useEffect(() => {
    if (location?.state?.action_type == 2) getData();
  }, [location?.state]);

  const getData = async () => {
    const sortObj = listStatusOrder?.find((i) => {
      if (i?.value == location?.state?.order?.orderStatus) {
        return i;
      }
    });

    setCrudData({ status: sortObj || null });
  };

  const saveExtend = async () => {
    if (!crudData?.status?.value) {
      myAlert('Выберите статус', 'error');
      return;
    }

    const send = {
      status: crudData?.status?.value,
      orderGuid: location?.state?.order?.guid
    };

    const result = await dispatch(crudStatusOrderReq(send)).unwrap();
    if (result?.res == 1) {
      myAlert(result?.mes);
      navigate(-1);
    } else {
      myAlert(result?.mes, 'error');
    }
  };

  const onChangeWS = (value, { name }) => {
    setCrudData({ ...crudData, [name]: value });
  };

  if (location?.state?.action_type == 2) {
    return (
      <div className="crudPays crudTableOrders tableOrders crudOrderStatus">
        <MainCard
          title={<TitlesModal title={'Редактирование статуса заказа'} />}
          sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
          contentSX={{ padding: 0 }}
        >
          <ConfigProvider locale={locale}>
            <div className="crudCleaning__inner">
              <div className="myInputs selectCategs">
                <h5>Выберите нужный статус</h5>
                <Select
                  options={listStatusOrder}
                  className="select"
                  onChange={onChangeWS}
                  name="status"
                  value={crudData?.status || null}
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
              <p className="info more">Перед сменой статуса, хорошенькой ознакомьтесь с данными брони, чтобы не ошибиться</p>
              <div className="actionBtn">
                <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
                <BtnSave click={saveExtend} text={'Сохранить'} />
              </div>
            </div>
          </ConfigProvider>
        </MainCard>
      </div>
    );
  }
};

export default CrudStatusOrder;
