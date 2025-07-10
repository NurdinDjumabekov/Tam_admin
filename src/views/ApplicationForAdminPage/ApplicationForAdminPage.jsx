////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns
import { createApplicationUser } from 'store/reducers/otherActionApartmentSlice';

////// components
import TitlesModal from 'common/TitlesModal/TitlesModal';
import MainCard from 'ui-component/cards/MainCard';
import SendInput from 'common/SendInput/SendInput';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';

////// style
import './style.scss';

////// helpers
import { myAlert } from 'helpers/myAlert';

//// страница отправки заявки
const ApplicationForAdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [crudData, setCrudData] = React.useState({});

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'number') {
      const onlyValid = value.replace(/[^+\d]/g, '');
      if (onlyValid.length > 13) return;
      setCrudData({ ...crudData, [name]: onlyValid });
    } else {
      setCrudData({ ...crudData, [name]: value });
    }
  };

  const createApplication = async () => {
    if (crudData?.fio?.length < 6 || !crudData?.fio) {
      return myAlert('Заполните ФИО', 'error');
    }
    if (!crudData?.gmail?.includes('@gmail.com')) {
      return myAlert('Заполните e-mail', 'error');
    }
    if (crudData?.number?.length != 13) {
      return myAlert('Некорректный номер телефона', 'error');
    }
    const result = await dispatch(createApplicationUser(crudData)).unwrap();
    if (result?.res === 1) {
      myAlert(result?.mes);
      navigate(-1);
    } else {
      myAlert(result?.mes, 'error');
    }
  };

  return (
    <div className="applicationForAdminPage">
      <MainCard
        title={
          <>
            <TitlesModal title={`Создание заявки `} />{' '}
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="applicationForAdminPage__inner">
          <div className="textCommentAdmin">
            <SendInput value={crudData?.fio} onChange={onChange} title={'Ваше фио'} name={'fio'} />
            <SendInput value={crudData?.gmail} onChange={onChange} title={'Ваш e-mail'} name={'gmail'} />
            <SendInput value={crudData?.number} onChange={onChange} title={'Ваш номер телефона (+996700754454)'} name={'number'} />
          </div>
          <div className="actionBtn">
            <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
            <BtnSave click={createApplication} text={'Отправить'} />
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default ApplicationForAdminPage;
