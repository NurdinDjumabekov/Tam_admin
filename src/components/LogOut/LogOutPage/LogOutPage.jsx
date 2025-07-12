////////// hooks
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns
import { clearDataSave } from 'store/reducers/saveDataSlice';

////// components
import TitlesModal from 'common/TitlesModal/TitlesModal';
import MainCard from 'ui-component/cards/MainCard';
import BtnCancel from 'common/BtnCancel/BtnCancel';
import BtnSave from 'common/BtnSave/BtnSave';

////// style
import './style.scss';

////// helpers

const LogOutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutFn = async () => {
    dispatch(clearDataSave());
    navigate('/');
  };

  return (
    <div className="applicationForAdminPage loginPage">
      <MainCard
        title={
          <div onClick={() => navigate(-2)}>
            <TitlesModal title={`Выход с аккаунта`} />
          </div>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="applicationForAdminPage__inner">
          <div className="textCommentAdmin">
            <p className="infoText">
              При выходе из аккаунта все данные будут удалены с вашего устройства. Они появятся снова только после повторного входа. В
              случае утери пароля обратитесь в администрацию.
            </p>
          </div>
          <div className="actionBtn">
            <BtnCancel click={() => navigate(-2)} text={'Отмена'} />
            <BtnSave click={logOutFn} text={'Выйти'} />
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default LogOutPage;
