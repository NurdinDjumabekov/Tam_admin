////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns
import { getAllLandLordReq, typeUsersFn } from 'store/reducers/usersSlice';

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
import Select from 'react-select';

////// style
import './style.scss';

////// helpers
import { UserStatusText } from 'helpers/enums';
import { listTypesOrder, objTypeOrder } from 'helpers/myLocal';

//// список пользователей
const ChoiceUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [crudData, setCrudData] = React.useState({});

  const { listLandlord, searchUser, typeUsers } = useSelector((state) => state.usersSlice);

  useEffect(() => {
    getData();
    setCrudData({ ...crudData, typeCreateOrder: listTypesOrder?.[0] });
    dispatch(typeUsersFn(listTypesOrder?.[0]?.value));
  }, []);

  const getData = async () => {
    dispatch(getAllLandLordReq({ typeUsers: objTypeOrder?.[listTypesOrder?.[0]?.value], searchUser }));
  };

  const onChangeWS = (status, { name }) => {
    setCrudData({ ...crudData, [name]: status });
    dispatch(getAllLandLordReq({ typeUsers: objTypeOrder?.[status?.value], searchUser }));
    dispatch(typeUsersFn(objTypeOrder?.[status?.value]));
  };

  return (
    <div className="tableUsers container choiceUserPage createBookingUser">
      <MainCard
        title={
          <div className="headerMain">
            <Titles title={`Выберите пользователя для которого хотите создать бронь`} />
            <hr />
            <div className="myInputs selectCategs">
              <Select
                options={listTypesOrder}
                className="select"
                onChange={onChangeWS}
                name="typeCreateOrder"
                value={crudData?.typeCreateOrder}
                menuPortalTarget={document.body}
                styles={{
                  container: (base) => ({
                    ...base,
                    width: 170,
                    minHeight: 32,
                    height: 32
                  }),
                  control: (base) => ({
                    ...base,
                    minHeight: 32,
                    height: 32,
                    padding: 0,
                    backgroundColor: '#1e1e1e',
                    borderColor: '#ffffff24',
                    color: '#ffffff24'
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    height: 32,
                    padding: '0 8px 8px 8px',
                    display: 'flex',
                    alignItems: 'center'
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: 32
                  }),
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#2172ef' : state.isFocused ? '#2a2a2a' : 'transparent',
                    color: state.isSelected ? '#e0e0e0' : '#e0e0e0',
                    cursor: 'pointer'
                  }),

                  singleValue: (base) => ({
                    ...base,
                    color: '#9e9e9e',
                    fontSize: '12px',
                    lineHeight: '16px'
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#333333',
                    borderRadius: 8,
                    overflow: 'hidden'
                  })
                }}
                required={true}
              />
            </div>
          </div>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="viewUsersPage">
          <TableVirtuoso
            data={listLandlord}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={(index, row) => rowContent(index, row, navigate, crudData)}
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

function rowContent(_index, row, navigate, crudData) {
  const choiceUser = () => {
    if (crudData?.typeCreateOrder?.value == 'tamkg') {
      const state = {
        value: row?.guid,
        label: `${row?.name} ${row?.firstName}`,
        typeCreateOrder: crudData?.typeCreateOrder,
        guidUser: row?.guid
      };
      navigate('/order/choice_apartment', { state });
    } else if (crudData?.typeCreateOrder?.value == 'landlords') {
      const state = {
        value: row?.guid,
        label: `${row?.name} ${row?.firstName}`,
        typeCreateOrder: crudData?.typeCreateOrder,
        guidUser: row?.guid
      };
      navigate('/order/create_order_landlords', { state });
    }
  };

  return columns?.map((column) => {
    if (column?.dataKey == 'codeid') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 0 }}>
          {row?.codeid}
        </TableCell>
      );
    }

    if (column?.dataKey == 'fullName') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {`${row?.lastName ?? ''} ${row?.name ?? ''} ${row?.firstName ?? ''}`}
        </TableCell>
      );
    }

    if (column?.dataKey == 'phoneNumber') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} align="left" sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          +{row?.phoneNumber}
        </TableCell>
      );
    }

    if (column?.dataKey == 'status') {
      return (
        <TableCell onClick={choiceUser} key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.[column?.dataKey] == 'verified' ? (
            <p className="everyOneActive">{UserStatusText?.[row?.[column?.dataKey]]}</p>
          ) : (
            <p className="everyOneNoActive">{UserStatusText?.[row?.[column?.dataKey]]}</p>
          )}
        </TableCell>
      );
    }

    if (column?.dataKey == 'choice') {
      return (
        <TableCell onClick={choiceUser} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }} key={column?.dataKey}>
          <Checkbox
            checked={false}
            // onClick={(e) => e.stopPropagation()}
            onChange={() => {}}
            inputProps={{ 'aria-label': 'Выбрать правило' }}
          />
        </TableCell>
      );
    }
  });
}

export default ChoiceUserPage;

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
  { width: '15%', label: 'Статус', dataKey: 'status' },
  { width: '15%', label: 'Выбор', dataKey: 'choice' }
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
