// hooks
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// fns
import { getListPriceReq } from 'store/reducers/otherActionApartmentSlice';
import { delTarifOrderReq, extendOrderReq } from 'store/reducers/orderSlice';

// components
import MainCard from 'ui-component/cards/MainCard';
import Select from 'react-select';
import TitlesModal from 'common/TitlesModal/TitlesModal';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';
import { ConfigProvider } from 'antd';

// helpers
import { myAlert } from 'helpers/myAlert';

// date
import locale from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';

// styles
import './style.scss';

const CrudPayPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [crudData, setCrudData] = useState({});
  const [listSelect, setListSelect] = useState([]);

  useEffect(() => {
    if (location?.state?.action_type == 1) getData();
  }, [location?.state]);

  const getData = async () => {
    const list = await dispatch(getListPriceReq({ guid_apartment: location?.state?.order?.apartment?.guid, extend: true })).unwrap();
    const newList = list.map((i) => ({ ...i, value: i?.guid, label: `${i?.name} (${+i?.price - i?.discount} сом)` }));
    setListSelect(newList);
    setCrudData({ tariff: newList?.[0] });
  };

  const saveExtend = async () => {
    const send = {
      newTariffGuid: crudData?.tariff?.value,
      orderGuid: location?.state?.order.guid
    };
    const result = await dispatch(extendOrderReq(send)).unwrap();
    if (result?.res == 1) {
      myAlert(result?.mes);
      navigate(-1);
    } else {
      myAlert(result?.mes, 'error');
    }
  };

  const delTariffPay = async () => {
    const send = {
      payGuid: location?.state?.pay?.guid,
      orderGuid: location?.state?.order.guid
    };
    const result = await dispatch(delTarifOrderReq(send)).unwrap();
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

  if (location?.state?.action_type == 1) {
    return (
      <div className="crudPays crudTableOrders tableOrders">
        <MainCard
          title={<TitlesModal title={'Продление аренды'} />}
          sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
          contentSX={{ padding: 0 }}
        >
          <ConfigProvider locale={locale}>
            <div className="crudCleaning__inner">
              <div className="myInputs selectCategs">
                <h5>Выберите тариф для продления аренды</h5>
                <Select
                  options={listSelect}
                  className="select"
                  onChange={onChangeWS}
                  name="tariff"
                  value={crudData?.tariff}
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
              <p className="info">Сумма указана с учетом скидки!</p>
              <p className="info dop">
                При продлении аренды автоматически обновляются все связанные временные параметры: новое время окончания аренды, а также
                начало и конец уборки. Ранее вручную установленные значения будут сброшены.
              </p>
              <div className="actionBtn">
                <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
                <BtnSave click={saveExtend} text={'Продлить'} />
              </div>
            </div>
          </ConfigProvider>
        </MainCard>
      </div>
    );
  }

  if (location?.state?.action_type == 3) {
    return (
      <div className="crudPays crudTableOrders tableOrders">
        <MainCard
          title={<TitlesModal title={'Удалить оплату ?'} />}
          sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
          contentSX={{ padding: 0 }}
        >
          <ConfigProvider locale={locale}>
            <div className="crudCleaning__inner">
              <p className="info nonePush">
                При удалении тарифа время аренды будет автоматически пересчитано. Это затронет дату и время окончания аренды, а также время
                начала и завершения уборки. Если вы ранее вручную изменяли эти параметры, из них будет вычтено время удаляемого тарифа.
              </p>
              <p className="info dop">Если вы удалите оплату, то восставноить ее будет невозможно.</p>
              <div className="actionBtn">
                <BtnCancel click={() => navigate(-1)} text={'Нет'} />
                <BtnSave click={delTariffPay} text={'Удалить'} />
              </div>
            </div>
          </ConfigProvider>
        </MainCard>
      </div>
    );
  }
};

export default CrudPayPage;
