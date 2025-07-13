////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns
import { getAllLandLordReq, listLandlordsFN } from 'store/reducers/usersSlice';

/////// icons
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import EditIcon from 'assets/MyIcons/EditIcon';

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
import CrudLandlordInfo from 'components/ListLandlordPage/CrudLandlordInfo';
import Titles from 'common/Titles/Titles';

///// enums
import { UserStatus, UserStatusText } from 'helpers/enums';

////// style
import './style.scss';

//// список арендодателей
const ListLandlordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listLandlord } = useSelector((state) => state.usersSlice);

  const [crudLandlord, setCrudLandlord] = useState({});

  useEffect(() => {
    getData();
    return () => dispatch(listLandlordsFN([]));
  }, []);

  const getData = () => dispatch(getAllLandLordReq({ typeUsers: 'landlord', searchUser: '' }));

  const addNewLanlord = () => {
    const state = { action_type: 1, status: { value: UserStatus.Verified.value, label: UserStatus.Verified.label } };
    navigate('/every/crud_user', { state });
  };

  return (
    <div className="my_tables list_landlord">
      <MainCard
        title={
          <div className="actionHeader">
            <Titles title={` Список арендодателей`} />
            <button onClick={addNewLanlord} className="standartBtn">
              Добавить арендодателя
            </button>
          </div>
        }
      >
        <div className="my_tables__inner">
          <TableVirtuoso
            data={listLandlord}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={(index, row) => rowContent(index, row, setCrudLandlord, navigate)}
          />
          <CrudLandlordInfo crudLandlord={crudLandlord} setCrudLandlord={setCrudLandlord} />
        </div>
      </MainCard>
    </div>
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

function rowContent(_index, row, setCrudLandlord, navigate) {
  const pastFN = (item, action_type) => {
    const state = { ...item, action_type, status: { value: item.status, label: UserStatusText?.[item.status] } };
    navigate('/every/crud_user', { state });
  };

  const viewApartment = () => {
    navigate('/every/apartments', { state: { guid: row?.guid, fio: `${row.firstName ?? ''} ${row.name ?? ''} ${row.lastName ?? ''}` } });
  };

  return columns?.map((column) => {
    if (column?.dataKey == 'codeid') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 0 }} onClick={viewApartment}>
          {_index + 1}
        </TableCell>
      );
    }
    if (column?.dataKey == 'phoneNumber') {
      return (
        <TableCell key={column?.dataKey} align="left" onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          +{row?.phoneNumber}
        </TableCell>
      );
    }
    if (column?.dataKey == 'status') {
      return (
        <TableCell onClick={viewApartment} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.[column?.dataKey] == 'blocked' ? (
            <p className="everyOneNoActive">Заблокирован</p>
          ) : (
            <p className="everyOneActive">Активен</p>
          )}
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
              <DeleteIcon width="20" height="20" title={'Удалить'} />
            </button>
          </div>
        </TableCell>
      );
    }
    if (column?.dataKey == '...') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <button className="viewClick" onClick={viewApartment}>
            Посмотреть
          </button>
        </TableCell>
      );
    }
    return (
      <TableCell onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
        {column.render ? column.render(row) : row?.[column?.dataKey]}
      </TableCell>
    );
  });
}

export default ListLandlordPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

const columns = [
  { width: '5%', label: '№', dataKey: 'codeid' },
  {
    width: '35%',
    label: 'ФИО',
    dataKey: 'fullName',
    render: (row) => `${row.firstName ?? ''} ${row.name ?? ''} ${row.lastName ?? ''}`
  },
  { width: '18%', label: 'Номер', dataKey: 'phoneNumber' },
  { width: '18%', label: 'Кол-во квартир', dataKey: 'count_apartment' },
  { width: '15%', label: 'Статус', dataKey: 'status' },
  { width: '15%', label: 'Действия', dataKey: '....' },
  { width: '15%', label: 'Квартиры', dataKey: '...' }
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
