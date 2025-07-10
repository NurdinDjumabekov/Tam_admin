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
import AddBoxIcon from '@mui/icons-material/AddBox';

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

////// style
import './style.scss';

//// список пользователей
const ListUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listLandlord } = useSelector((state) => state.usersSlice);

  const [crudLandlord, setCrudLandlord] = useState({});

  useEffect(() => {
    getData();
    return () => dispatch(listLandlordsFN([]));
  }, []);

  const getData = () => dispatch(getAllLandLordReq({ typeUsers: 'client', searchUser: '' }));

  return (
    <div className="tableUsers">
      <MainCard
        title={
          <>
            Список арендодателей
            <button className="createUser" onClick={() => setCrudLandlord({ action_type: 1, status: { value: '1', label: 'Активный' } })}>
              <AddBoxIcon sx={{ width: 20, height: 20 }} />
              <p>Добавить арендодателя</p>
            </button>
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="viewUsersPage">
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
    setCrudLandlord({ ...item, action_type, status: { value: item.status, label: item.status == 0 ? 'Не активный' : 'Активный' } });
  };

  return columns?.map((column) => {
    if (column?.dataKey == 'codeid') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 0 }}>
          {_index + 1}
        </TableCell>
      );
    }
    if (column?.dataKey == 'phoneNumber') {
      return (
        <TableCell key={column?.dataKey} align="left" sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          +{row?.phoneNumber}
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
              <DeleteIcon width="20" height="20" title={'Удалить'} color="rgba(255, 0, 0, 0.56)" />
            </button>
          </div>
        </TableCell>
      );
    }

    if (column?.dataKey == 'status') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.[column?.dataKey] == 'blocked' ? (
            <p className="everyOneNoActive">Заблокирован</p>
          ) : (
            <p className="everyOneActive">Активен</p>
          )}
        </TableCell>
      );
    }
    if (column?.dataKey == '...') {
      const viewApartment = () => navigate('/list/apartment_landlord', { state: row?.fio });
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <button className="viewLandlord" onClick={viewApartment}>
            Посмотреть
          </button>
        </TableCell>
      );
    }
    return (
      <TableCell sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
        {column.render ? column.render(row) : row?.[column?.dataKey]}
      </TableCell>
    );
  });
}

export default ListUsersPage;

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
    render: (row) => `${row.lastName ?? ''} ${row.name ?? ''} ${row.firstName ?? ''}`
  },
  { width: '18%', label: 'Номер', dataKey: 'phoneNumber' },
  { width: '18%', label: 'Кол-во квартир', dataKey: 'count_apartment' },
  { width: '15%', label: 'Статус', dataKey: 'status' },
  { width: '15%', label: 'Действия', dataKey: '....' },
  { width: '15%', label: 'Квартиры', dataKey: '...' }
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
