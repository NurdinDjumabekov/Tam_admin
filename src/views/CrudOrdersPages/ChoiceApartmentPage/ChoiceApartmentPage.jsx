////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////// fns

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
import Checkbox from '@mui/material/Checkbox';

////// style
import './style.scss';

////// helpers
import { ApartmentStatusesText } from 'helpers/enums';
import { getListApartmentsReq } from 'store/reducers/apartmentsSlice';

//// список квартир
const ChoiceApartmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { listApartments, searchApartment } = useSelector((state) => state.apartmentsSlice);

  useEffect(() => {
    dispatch(getListApartmentsReq({ searchApartment }));
  }, []);

  return (
    <div className="tableUsers container choiceUserPage">
      <MainCard
        title={
          <>
            <Titles title={`Выберите квартиру куда хотите заселить клиента (${location?.state?.label})`} />
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
            itemContent={(index, row) => rowContent(index, row, navigate, location)}
          />
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

function rowContent(_index, row, navigate, location) {
  const choiceUser = () => {
    const state = {
      ...location?.state,
      address: row?.address,
      id: row?.id,
      guidApartment: row?.guid
    };
    navigate('/order/create_order_users', { state });
  };

  return columns?.map((column) => {
    if (column?.dataKey == 'codeid') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 0 }}>
          {row?.id}
        </TableCell>
      );
    }

    if (column?.dataKey == 'address') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {`${row?.address}`}
        </TableCell>
      );
    }

    if (column?.dataKey == 'apartmentsType') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} align="left" sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.apartmentsType}
        </TableCell>
      );
    }

    if (column?.dataKey == 'apartmentCategory') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} align="left" sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.apartmentCategory}
        </TableCell>
      );
    }

    if (column?.dataKey == 'status') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <p className={row?.[column?.dataKey] == 'active' ? 'everyOneActive' : 'everyOneNoActive'}>
            {ApartmentStatusesText?.[row?.[column?.dataKey]]}
          </p>
        </TableCell>
      );
    }

    if (column?.dataKey == 'percentage') {
      if (row?.installLock) {
        return (
          <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
            {row?.[column?.dataKey] === '-' ? (
              <p className="everyOneNoActiveBlink">Ошибка!!!</p>
            ) : (
              <p className={+row?.[column?.dataKey] > 7 ? 'everyOneActive' : 'everyOneNoActive'}>{row?.[column?.dataKey]}%</p>
            )}
          </TableCell>
        );
      } else {
        return (
          <TableCell sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
            ---
          </TableCell>
        );
      }
    }

    if (column?.dataKey == 'choice') {
      return (
        <TableCell onClick={choiceUser} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
          <Checkbox
            checked={false}
            onClick={(e) => e.stopPropagation()}
            onChange={() => {}}
            inputProps={{ 'aria-label': 'Выбрать правило' }}
          />
        </TableCell>
      );
    }
  });
}

export default ChoiceApartmentPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

const columns = [
  { width: '5%', label: '№', dataKey: 'codeid' },
  { width: '35%', label: 'Адрес', dataKey: 'address' },
  { width: '18%', label: 'Тип', dataKey: 'apartmentsType' },
  { width: '15%', label: 'Категория', dataKey: 'apartmentCategory' },
  { width: '15%', label: 'Статус', dataKey: 'status' },
  { width: '15%', label: 'Зарядка замка	', dataKey: 'percentage' },
  { width: '15%', label: 'Выбрать', dataKey: 'choice' }
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
