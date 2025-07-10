////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// fns
import { editRulesApartmnentReq, getRulesAllReq, listAllRulesFN } from 'store/reducers/otherActionApartmentSlice';

/////// icons
import AddBoxIcon from '@mui/icons-material/AddBox';

////// components
import MainCard from 'ui-component/cards/MainCard';

////// style
import './style.scss';

////// helpers && enums
import { myAlert } from 'helpers/myAlert';

//// список пользователей
import Checkbox from '@mui/material/Checkbox';

const CrudRulesApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { listAllRules } = useSelector((state) => state.otherActionApartmentSlice);

  useEffect(() => {
    getData();
    return () => dispatch(listAllRulesFN([]));
  }, [location.state.guid_apartment]);

  const getData = async () => {
    dispatch(getRulesAllReq(location.state));
  };

  const onChange = (guid) => {
    const updated = listAllRules?.map((rule) => (rule.guid === guid ? { ...rule, view_in_apartment: !rule.view_in_apartment } : rule));
    dispatch(listAllRulesFN(updated));
  };

  const saveRules = async () => {
    const send = { list: listAllRules, guid_apartment: location.state.guid_apartment };
    const result = await dispatch(editRulesApartmnentReq(send)).unwrap();
    if (result.res == 1) {
      myAlert(result.mes);
      navigate(-2);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  return (
    <div className="crud_apartment_page crud_more_data_apartment">
      <MainCard
        title={
          <>
            Выберите необходимые параметры{' '}
            <button className="createUser" onClick={saveRules}>
              <AddBoxIcon sx={{ width: 20, height: 20 }} />
              <p>Сохранить</p>
            </button>
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="crud_apartment_page__inner">
          {listAllRules?.length > 0 ? (
            listAllRules?.map((rule) => (
              <div className="rule-item" key={rule.guid} onClick={() => onChange(rule.guid)}>
                <div className="rule-icon-check">
                  <Checkbox
                    checked={rule.view_in_apartment}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => onChange(rule.guid)}
                    inputProps={{ 'aria-label': 'Выбрать правило' }}
                  />
                  <img src={rule.iconUrl} alt={rule.name} className="rule-icon" />
                </div>
                <div className="rule-texts">
                  <p className="rule-name">{rule.name}</p>
                  <p className="rule-desc">{rule.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty_list">Пустой список</p>
          )}
        </div>
      </MainCard>
    </div>
  );
};

export default CrudRulesApartmentPage;
