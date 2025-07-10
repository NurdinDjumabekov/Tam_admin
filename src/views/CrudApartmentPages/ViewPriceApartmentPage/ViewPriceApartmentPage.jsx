import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

///// components
import AddBoxIcon from '@mui/icons-material/AddBox';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { TableVirtuoso } from 'react-virtuoso';

///// helpers
import { myAlert } from 'helpers/myAlert';
import { crudPriceApartmentReq, getListPriceReq, listPricesFN } from 'store/reducers/otherActionApartmentSlice';

///// style
import './style.scss';

///// imgs
import EditIcon from 'assets/MyIcons/EditIcon';
import DeleteIcon from 'assets/MyIcons/DeleteIcon';

const columns = [
  { width: '10%', label: '№', dataKey: 'index' },
  { width: '25%', label: 'Название', dataKey: 'name' },
  { width: '15%', label: 'Цена', dataKey: 'price' },
  { width: '15%', label: 'Скидка', dataKey: 'discount' },
  { width: '15%', label: 'Для доп. продления', dataKey: 'viewFordopList' },
  { width: '15%', label: 'Действия', dataKey: 'actions' }
];

const ViewPriceApartmentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { listPrices } = useSelector((state) => state.otherActionApartmentSlice);

  useEffect(() => {
    getData();
    return () => dispatch(listPricesFN([]));
  }, [location?.state?.guid_apartment]);

  const getData = () => {
    dispatch(getListPriceReq({ guid_apartment: location?.state?.guid_apartment, extend: true }));
  };

  const addNewPrice = ({}, action_type) => {
    const guid_apartment = location.state.guid_apartment;
    const send = {
      guid_apartment,
      action_type,
      nav: 1
    };
    navigate('/every/crud_apartment_price', { state: send });
  };

  const onChange = async (item) => {
    const sendData = {
      guid: item?.guid,
      price: item?.price?.toString(),
      name: item?.name,
      duration: item?.duration,
      durationInMinutes: +item?.durationInMinutes,
      discount: Number(parseFloat(item?.discount).toFixed(1)) || 0.0,
      status: true,
      type: '1',
      action_type: 2,
      apartmentId: location.state.guid_apartment,
      viewFordopList: !item?.viewFordopList
    };
    const result = await dispatch(crudPriceApartmentReq(sendData)).unwrap();
    if (result.res == 1) {
      getData();
      myAlert(result.mes);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  const crudApartmentFN = (row, type) => {
    const guid_apartment = location.state.guid_apartment;
    const send = {
      ...row,
      guid_apartment,
      action_type: type,
      nav: 1
    };
    navigate('/every/crud_apartment_price', { state: send });
  };

  return (
    <div className="tableLandlords tableApartments price_list">
      <MainCard
        title={
          <>
            {location?.state?.address}
            <button className="createUser" onClick={() => addNewPrice({}, 1)}>
              <AddBoxIcon sx={{ width: 20, height: 20 }} />
              <p>Добавить</p>
            </button>
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="viewUsersPage">
          {listPrices?.length ? (
            <TableVirtuoso
              data={listPrices}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={(index, row) => rowContent(index, row, onChange, crudApartmentFN)}
            />
          ) : (
            <p className="empty_list">Пустой список</p>
          )}
        </div>
      </MainCard>
    </div>
  );
};

export default ViewPriceApartmentPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          style={{ width: column.width, paddingTop: 7, paddingBottom: 12 }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row, onChange, crudApartmentFN) {
  return columns.map((column) => {
    if (column.dataKey === 'index') {
      return (
        <TableCell key={column.dataKey} sx={{ padding: 1, paddingLeft: 2 }}>
          {index + 1}
        </TableCell>
      );
    }

    if (column.dataKey === 'viewFordopList') {
      return (
        <TableCell key={column.dataKey} className="checkBoxPrice" sx={{ padding: '4px 6px', minWidth: 40 }}>
          <Checkbox
            sx={{ padding: '4px' }}
            checked={row.viewFordopList}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onChange(row)}
            inputProps={{ 'aria-label': 'Выбрать правило' }}
          />
        </TableCell>
      );
    }

    if (column.dataKey === 'actions') {
      return (
        <TableCell key={column.dataKey} align="left" sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <button onClick={() => crudApartmentFN(row, 2)}>
              <EditIcon width="18" height="18" title="Редактировать" />
            </button>
            <button onClick={() => crudApartmentFN(row, 3)}>
              <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title="Удалить" />
            </button>
          </div>
        </TableCell>
      );
    }

    return (
      <TableCell key={column.dataKey} sx={{ padding: 1, paddingLeft: 2 }}>
        {row[column.dataKey]}
      </TableCell>
    );
  });
}
