////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// fns
import { crudLandLordReq } from 'store/reducers/usersSlice';

////// components
import TitlesModal from 'common/TitlesModal/TitlesModal';
import MainCard from 'ui-component/cards/MainCard';
import SendInput from 'common/SendInput/SendInput';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';
import Select from 'react-select';

////// style
import './style.scss';

////// helpers
import { myAlert } from 'helpers/myAlert';
import { listActive } from 'helpers/myLocal';
import DelAlert from 'common/DelAlert/DelAlert';
import MySelect from 'common/MySelect/MySelect';

//// crud пользователя
const CrudLandlordsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [crudLandlord, setCrudLandlord] = React.useState({
    status: location?.state?.status,
    firstName: location?.state?.firstName || '',
    name: location?.state?.name || '',
    lastName: location?.state?.lastName || '',
    password: location?.state?.password || '',
    phoneNumber: location?.state?.phoneNumber || '',
    guid: location?.state?.guid || ''
  });

  const crudLandLordFn = async () => {
    if (crudLandlord?.firstName == '') {
      return myAlert('Введите свою фамилию', 'error');
    }

    if (crudLandlord?.name == '') {
      return myAlert('Введите своё имя', 'error');
    }

    if (crudLandlord?.lastName == '') {
      return myAlert('Введите свое отчетсво', 'error');
    }

    if (crudLandlord?.password == '') {
      return myAlert('Введите пароль', 'error');
    }

    if (crudLandlord?.phoneNumber?.length != 12 || !crudLandlord?.phoneNumber?.length) {
      return myAlert('Некорректный номер телефона', 'error');
    }

    const send = {
      ...crudLandlord,
      status: crudLandlord?.status?.value,
      action_type: location?.state?.action_type
    };

    const result = await dispatch(crudLandLordReq(send)).unwrap();
    if (result.res == 1) {
      navigate(-1);
      myAlert(result.mes);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const onlyDigits = value.replace(/\D/g, '').slice(0, 12);
      setCrudLandlord({ ...crudLandlord, [name]: onlyDigits });
    } else {
      setCrudLandlord({ ...crudLandlord, [name]: value });
    }
  };

  const onChangeWS = (status) => setCrudLandlord({ ...crudLandlord, status });

  if (location?.state?.action_type == 3) {
    return (
      <DelAlert
        title={'Удаление арендодателя'}
        text={
          'Вы действительно хотите удалить арендодателя ? Этот процесс не обратим, если вы удалеите арендодателя, то данные восстановить не получится!'
        }
        click={crudLandLordFn}
        yesText={'Удалить'}
        noText={'Отмена'}
      />
    );
  }

  const titleModal = crudLandlord?.action_type == 1 ? 'Введите данные' : 'Редактирование';

  return (
    <div className="crud_data">
      <MainCard title={<TitlesModal title={titleModal} />}>
        <div className="crud_data__inner">
          <MySelect value={crudLandlord?.status} onChangeWS={onChangeWS} list={listActive} title={'Статус'} />
          <SendInput value={crudLandlord?.firstName} onChange={onChange} title={'Фамилие'} name={'firstName'} />
          <SendInput value={crudLandlord?.name} onChange={onChange} title={'Имя'} name={'name'} />
          <SendInput value={crudLandlord?.lastName} onChange={onChange} title={'Отчетсво'} name={'lastName'} />
          <SendInput value={crudLandlord?.password} onChange={onChange} title={'Пароль'} name={'password'} />
          <SendInput
            value={crudLandlord?.phoneNumber}
            onChange={onChange}
            title={'Номер (WhatsApp)'}
            name={'phoneNumber'}
            placeholder={'996*********'}
            type="number"
          />
          <div className="actionCrudBtn">
            <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
            <BtnSave click={crudLandLordFn} text={'Сохранить'} />
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default CrudLandlordsPage;
