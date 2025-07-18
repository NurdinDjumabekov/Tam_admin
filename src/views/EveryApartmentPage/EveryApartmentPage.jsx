////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';

/////// fns
import { getListApartmentsReq, listApartmentsFN } from 'store/reducers/apartmentsSlice';

/////// icons
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import EditIcon from 'assets/MyIcons/EditIcon';
import MapIcon from 'assets/MyIcons/MapIcon';
import AddIcon from '@mui/icons-material/Add';

///// enums
import { ApartmentStatusesText } from 'helpers/enums';

////// components
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Titles from 'common/Titles/Titles';

////// style
import './style.scss';

//// список пользователей
const EveryApartmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isSmall = useMediaQuery('(max-width:550px)');
  const isSmall650 = useMediaQuery('(max-width:650px)');

  const { listApartments } = useSelector((state) => state.apartmentsSlice);

  useEffect(() => {
    getData();
    return () => dispatch(listApartmentsFN([]));
  }, [location.state.guid]);

  const getData = () => {
    dispatch(getListApartmentsReq({ guidLandlord: location.state.guid }));
  };

  const crudApartmentFN = (props, action_type) => {
    const { guid, longitude, latitude, address } = props;
    const { lockServiceNumber, adminGuid, code_lock_standart } = props;
    const state = {
      guid_apartment: guid,
      guid_landlord: location.state.guid,
      action_type,
      longitude,
      latitude,
      address,
      lockServiceNumber,
      adminGuid,
      code_lock_standart
    };
    if (action_type == 1) {
      navigate('/every/apartment_crud', { state: { ...state, nav: 1 } });
    } else if (action_type == 2) {
      navigate('/every/menu_action', { state });
    } else if (action_type == 3) {
      navigate('/every/apartment_crud', { state: { ...state, nav: 1 } });
    } else if (action_type == 4) {
      navigate('/every/map_action', { state: { ...state, nav: 1 } });
    } else {
      navigate('/every/apartment_crud', { state });
    }
  };

  return (
    <div className="my_tables everyApartment">
      <MainCard
        title={
          <div className="actionHeader">
            <Titles title={`Квартиры (${location.state.fio})`} />
            <button onClick={() => crudApartmentFN({ guid: '' }, 1)} className="standartBtn">
              {isSmall650 ? <AddIcon sx={{ width: 19, height: 19 }} /> : 'Добавить квартиру'}
            </button>
          </div>
        }
      >
        <div className="my_tables__inner">
          {listApartments?.length !== 0 ? (
            <TableVirtuoso
              data={listApartments}
              components={VirtuosoTableComponents}
              fixedHeaderContent={() => fixedHeaderContent(isSmall)}
              itemContent={(index, row) => rowContent(index, row, crudApartmentFN, isSmall)}
            />
          ) : (
            <p className="empty_list">Пустой список</p>
          )}
        </div>
      </MainCard>
    </div>
  );
};

function fixedHeaderContent(isSmall) {
  if (isSmall) return <></>;
  else {
    return (
      <TableRow>
        {columns?.map((column) => (
          <TableCell
            key={column?.dataKey}
            variant="head"
            align={'left'}
            style={{ width: column?.width, paddingTop: 7, paddingBottom: 12 }}
            sx={{ backgroundColor: 'background.paper' }}
          >
            {column?.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }
}

function rowContent(_index, row, crudApartmentFN, isSmall) {
  const columnsMobile = [{ width: '100%', label: '№', dataKey: 'codeid' }];

  if (isSmall) {
    return columnsMobile?.map((column, index) => {
      return (
        <TableCell className="mobileListLandlord" key={index}>
          <div className="everyLandlordCard">
            <div className="landlordHeader">
              <p className="name">{`${row?.address ?? ''}`}</p>
              <button onClick={() => crudApartmentFN(row, 2)}>
                <EditIcon width="18" height="18" title={''} />
              </button>
            </div>

            <div className="landlordBody">
              <div>
                <p>№ {row?.id}</p>
                <span></span>
              </div>

              <div>
                <p>Статус:</p>
                <span className={`status ${row?.status === 'blocked' ? 'blocked' : 'active'}`}>
                  {row?.status == 'blocked' ? 'Заблокирован' : 'Активен'}
                </span>
              </div>

              <div>
                <p>Категория:</p>
                <span>{row?.apartmentCategory} </span>
              </div>

              <div>
                <p>Тип:</p>
                <span>{row?.apartmentsType} </span>
              </div>

              <div>
                <p>Заряд замка:</p>
                <span>
                  {row?.installLock ? (
                    <span className="status">
                      {row?.percentage === '-' ? (
                        <p className="everyOneNoActiveBlink">Ошибка!!!</p>
                      ) : (
                        <p className={+row?.percentage > 7 ? 'everyOneActive' : 'everyOneNoActive'}>{row?.percentage}%</p>
                      )}
                    </span>
                  ) : (
                    <span className="status blocked">Замок отсутствует</span>
                  )}
                </span>
              </div>

              <div>
                <p>Постоянный код:</p>
                <span>{row?.installLock ? `${row?.code_lock_standart}#` : 'Замок отсутствует'}</span>
              </div>
            </div>

            <div className="actions_landlord">
              <button onClick={() => crudApartmentFN(row, 3)}>Удалить</button>
              <button onClick={() => crudApartmentFN(row, 2)}>Редактировать</button>
            </div>
          </div>
        </TableCell>
      );
    });
  } else {
    return columns?.map((column) => {
      if (column?.dataKey == 'codeid') {
        return (
          <TableCell onClick={() => crudApartmentFN(row, 2)} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 0 }}>
            {_index + 1}
          </TableCell>
        );
      }
      if (column?.dataKey == 'apartmentsType') {
        return (
          <TableCell
            onClick={() => crudApartmentFN(row, 2)}
            key={column?.dataKey}
            align="left"
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
          >
            {row?.apartmentsType}
          </TableCell>
        );
      }

      if (column?.dataKey == 'status') {
        return (
          <TableCell onClick={() => crudApartmentFN(row, 2)} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
            <p className={row?.[column?.dataKey] == 'active' ? 'everyOneActive' : 'everyOneNoActive'}>
              {ApartmentStatusesText?.[row?.[column?.dataKey]]}
            </p>
          </TableCell>
        );
      }

      if (column?.dataKey == 'percentage') {
        if (row?.installLock) {
          return (
            <TableCell onClick={() => crudApartmentFN(row, 2)} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
              {row?.[column?.dataKey] === '-' ? (
                <p className="everyOneNoActiveBlink">Ошибка!!!</p>
              ) : (
                <p className={+row?.[column?.dataKey] > 7 ? 'everyOneActive' : 'everyOneNoActive'}>{row?.[column?.dataKey]}%</p>
              )}
            </TableCell>
          );
        } else {
          return (
            <TableCell onClick={() => crudApartmentFN(row, 2)} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
              ---
            </TableCell>
          );
        }
      }

      if (column?.dataKey === 'code_lock_standart') {
        if (row?.installLock) {
          return (
            <TableCell onClick={() => crudApartmentFN(row, 2)} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
              {column.render ? column.render(row) : `${row?.[column?.dataKey]}#`}
            </TableCell>
          );
        } else {
          return (
            <TableCell onClick={() => crudApartmentFN(row, 2)} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
              Замок отсутствует
            </TableCell>
          );
        }
      }

      if (column?.dataKey == '....') {
        return (
          <TableCell key={column?.dataKey} align={'left'} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
            <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
              <button onClick={() => crudApartmentFN(row, 2)}>
                <EditIcon width="18" height="18" title={'Редактирование главных данных'} />
              </button>
              <button onClick={() => crudApartmentFN(row, 3)}>
                <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title={'Удалить'} />
              </button>

              <button onClick={() => crudApartmentFN(row, 4)} className="mapIcon">
                <MapIcon width="16" height="16" title={'Посмотреть на карте'} />
              </button>
            </div>
          </TableCell>
        );
      }

      return (
        <TableCell onClick={() => crudApartmentFN(row, 2)} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
          {column.render ? column.render(row) : row?.[column?.dataKey]}
        </TableCell>
      );
    });
  }
}

export default EveryApartmentPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

const columns = [
  { width: '5%', label: '№', dataKey: 'codeid' },
  { width: '17%', label: 'Адрес', dataKey: 'address' },
  { width: '18%', label: 'Тип', dataKey: 'apartmentsType' },
  { width: '18%', label: 'Категория', dataKey: 'apartmentCategory' },
  { width: '15%', label: 'Статус', dataKey: 'status' },
  { width: '15%', label: 'Зарядка замка', dataKey: 'percentage' },
  { width: '15%', label: 'Постоянный код', dataKey: 'code_lock_standart' },
  { width: '15%', label: 'Действия', dataKey: '....' }
];
