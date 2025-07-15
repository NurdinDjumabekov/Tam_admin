////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// icons

////// components
import MainCard from 'ui-component/cards/MainCard';
import Select from 'react-select';
import SendInput from 'common/SendInput/SendInput';
import Titles from 'common/Titles/Titles';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';
import DelAlert from 'common/DelAlert/DelAlert';

////// style
import './style.scss';

////// helpers && enums
import { listBollean, listPrice } from 'helpers/myLocal';
import { myAlert } from 'helpers/myAlert';

////// fns
import { crudPriceApartmentReq } from 'store/reducers/otherActionApartmentSlice';
import MySelect from 'common/MySelect/MySelect';

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

    if (!crudData?.name?.label) {
      return myAlert('Выберите название тарифа', 'error');
    }

    if (!crudData?.price) {
      return myAlert('Заполните цену тарифа', 'error');
    }

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
      <DelAlert
        title={'Удаление прайса'}
        text={'Вы действительно хотите удалить прайс ? Этот процесс не обратим и одноразовый !'}
        yesText={'Удалить'}
        noText={'Отмена'}
        click={crudLandLordFn}
      />
    );
  }

  const objtitle = { 1: 'Создание нового прайса', 2: 'Редактирование прайса' };
  return (
    <div className="crud_data crudPrice">
      <MainCard title={<Titles title={objtitle?.[location.state?.action_type]} />}>
        <div className="crud_data__inner">
          <form className="crudUsers">
            <MySelect value={crudData?.name} onChangeWS={onChangeWS} list={listPrice} title={'Выберите тариф'} name={'name'} />

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

            <MySelect
              value={crudData?.viewFordopList}
              onChangeWS={onChangeWS}
              list={listBollean}
              title={`Отображать только при продлении? (в основном списке его не будет)`}
              name={'viewFordopList'}
            />

            <div className="actionBtn">
              <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
              <BtnSave click={crudLandLordFn} text={'Сохранить'} />
            </div>
          </form>
        </div>
      </MainCard>
    </div>
  );
};

export default CrudPriceApartmentPage;
