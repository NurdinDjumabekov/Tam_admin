////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns
import { loginReq } from 'store/reducers/usersSlice';

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
import { dataSaveFn } from 'store/reducers/saveDataSlice';

//// страница входа
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [crudData, setCrudData] = React.useState({ login: '', password: '' });

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'login') {
      const onlyValid = value.replace(/[^+\d]/g, '');
      if (onlyValid.length > 12) return;
      setCrudData({ ...crudData, [name]: onlyValid });
    } else {
      setCrudData({ ...crudData, [name]: value });
    }
  };

  const createApplication = async () => {
    if (crudData?.login?.length != 12) {
      return myAlert('Некорректный номер телефона', 'error');
    }

    if (crudData?.password?.length < 3 || !crudData?.password) {
      return myAlert('Заполните пароль', 'error');
    }

    const result = await dispatch(loginReq(crudData)).unwrap();
    if (result?.res === 1) {
      dispatch(
        dataSaveFn({
          guid: result?.guid,
          typeUser: result?.typeUser,
          fio: result?.fio,
          phoneNumber: result?.phoneNumber
        })
      );
    } else {
      myAlert(result?.mes, 'error');
    }
  };

  return (
    <div className="applicationForAdminPage loginPage mainLogin">
      <MainCard
        title={<TitlesModal title={`Вход в аккаунт`} />}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="applicationForAdminPage__inner">
          <div className="textCommentAdmin">
            <SendInput value={crudData?.login} onChange={onChange} title={'Введите номер телефона (996700754454)'} name={'login'} />
            <SendInput value={crudData?.password} onChange={onChange} title={'Введите пароль'} name={'password'} />
          </div>
          <div className="actionBtn">
            <BtnCancel click={() => navigate(-1)} text={'Отмена'} />
            <BtnSave click={createApplication} text={'Войти'} />
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default LoginPage;
