////////// hooks
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns

////// components
import TitlesModal from 'common/TitlesModal/TitlesModal';
import MainCard from 'ui-component/cards/MainCard';

////// style
import './style.scss';

////// helpers
import { clearDataSave } from 'store/reducers/saveDataSlice';

const NotFoundPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(clearDataSave());
      navigate('/');
    }, 3000);
  }, []);

  return (
    <div className="applicationForAdminPage loginPage">
      <MainCard
        title={
          <div onClick={() => navigate(-2)}>
            <TitlesModal title={`Усп, вы что-то пошло не так`} />
          </div>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="applicationForAdminPage__inner">
          <div className="textCommentAdmin">
            <p className="infoText">
              Страница не найдена. Через несколько секунд вы будете перенаправлены на страницу входа. Пожалуйста, зарегистрируйтесь или
              войдите в систему.
            </p>
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default NotFoundPage;
