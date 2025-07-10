////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/////// fns
import { getListApartmentsReq, getEquipmentReq, listApartmentsFN } from 'store/reducers/apartmentsSlice';
import ApartmentEquipment from 'components/ListApartmentLandlordPage/ApartmentEquipment/ApartmentEquipment';

/////// icons
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import EditIcon from 'assets/MyIcons/EditIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MapIcon from 'assets/MyIcons/MapIcon';

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

////// style
import './style.scss';

////// helpers

//// список арендодателей
const ListApartmentLandlordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { listApartments } = useSelector((state) => state.apartmentsSlice);

  const [crudApartment, setCrudApartment] = useState({});
  const [viewEquipment, setViewEquipment] = useState({});

  useEffect(() => {
    getData(location?.state);
    return () => dispatch(listApartmentsFN([]));
  }, [location?.state]);

  const getData = (fio_landlord) => {
    const send = { fio_landlord };
    dispatch(getListApartmentsReq(send));
  };

  return (
    <MainCard
      title={
        <>
          Список квартир
          <button className="createUser" onClick={() => setCrudApartment({ action_type: 1, status: { value: '1', label: 'Активный' } })}>
            <AddBoxIcon sx={{ width: 20, height: 20 }} />
            <p>Добавить квартиру</p>
          </button>
        </>
      }
      sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
      contentSX={{ padding: 0 }}
    >
      <div className="viewUsersPage">
        <TableVirtuoso
          data={listApartments}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row, setCrudApartment, dispatch, setViewEquipment, viewEquipment)}
        />
        <ApartmentEquipment viewEquipment={viewEquipment} setViewEquipment={setViewEquipment} />
      </div>
    </MainCard>
  );
};

function fixedHeaderContent() {
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

function rowContent(_index, row, setCrudApartment, dispatch, setViewEquipment) {
  const pastFN = (item, action_type) => {
    setCrudApartment({ ...item, action_type, status: { value: item.status, label: item.status == 0 ? 'Не активный' : 'Активный' } });
  };

  const getEquipment = async (obj) => {
    await dispatch(getEquipmentReq({ guid_apartment: obj.guid }));
    setViewEquipment(obj);
  };

  return columns?.map((column) => {
    if (column?.dataKey == 'codeid') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {_index + 1}
        </TableCell>
      );
    }
    if (column?.dataKey == '....') {
      return (
        <TableCell key={column?.dataKey} align={'left'} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
            <button onClick={() => pastFN(row, 2)}>
              <EditIcon width="18" height="18" title={'Редактировать'} />
            </button>
            <button onClick={() => pastFN(row, 3)}>
              <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title={'Удалить'} />
            </button>
            <button onClick={() => pastFN(row, 3)} style={{ marginBottom: 1 }}>
              <MapIcon width="15" height="16" title={'Посмотреть на карте'} />
            </button>
          </div>
        </TableCell>
      );
    }
    if (column?.dataKey == 'status') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.[column?.dataKey] == 0 ? <p className="everyOneActive">Свободен</p> : <p className="everyOneNoActive">Занят</p>}
        </TableCell>
      );
    }
    if (column?.dataKey == 'lock_status') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.[column?.dataKey] == 0 ? <p className="everyOneActive">Закрыта</p> : <p className="everyOneNoActive">Открыта</p>}
        </TableCell>
      );
    }

    if (column?.dataKey == 'charging_percentage') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <p className={+row?.[column?.dataKey] > 7 ? 'everyOneActive' : 'everyOneNoActive'}>{row?.[column?.dataKey]}%</p>
        </TableCell>
      );
    }

    if (column?.dataKey == '.....') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <button className="viewLandlord" onClick={() => getEquipment(row)}>
            Подробнее
          </button>
        </TableCell>
      );
    }

    if (column?.dataKey == '...') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <button className="viewLandlord" onClick={() => getEquipment(row)}>
            Посмотреть
          </button>
        </TableCell>
      );
    }
    return (
      <TableCell sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
        {row?.[column?.dataKey]}
      </TableCell>
    );
  });
}

export default ListApartmentLandlordPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

const columns = [
  { width: '5%', label: '№', dataKey: 'codeid' },
  { width: '25%', label: 'Адрес', dataKey: 'addres' },
  { width: '15%', label: 'Статус', dataKey: 'status' },
  { width: '15%', label: 'Дверь', dataKey: 'lock_status' },
  { width: '15%', label: 'История квартиры', dataKey: '.....' },
  { width: '15%', label: 'Зарядка замка', dataKey: 'charging_percentage' },
  { width: '15%', label: 'Действия', dataKey: '....' },
  { width: '15%', label: 'Оснащение квартиры', dataKey: '...' }
];
