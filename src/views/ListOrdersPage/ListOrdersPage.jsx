////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns
import { activeDateDayFN, activeSelectRoleFN, getListOrdersReq, listOrdersFN } from 'store/reducers/orderSlice';
import { ru } from 'date-fns/locale';
import { format, parse } from 'date-fns';

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
import Select from 'react-select';
import DatePicker from 'react-datepicker';

///// enums
import { listTypeUsers, objRole, orderStatus } from 'helpers/myLocal';

////// style
import './style.scss';

//// список арендодателей
const ListOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listOrders } = useSelector((state) => state.orderSlice);
  const { activeDateDay, activeSelectRole } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    getData();
    return () => dispatch(listOrdersFN([]));
  }, []);

  const onChangeDate = (value) => {
    const date = format(value, 'yyyy-MM-dd', { locale: ru });
    dispatch(activeDateDayFN(date));
    dispatch(getListOrdersReq({ date, typeUsers: activeSelectRole?.value }));
  };

  const getData = () => {
    const date = format(activeDateDay, 'yyyy-MM-dd', { locale: ru });
    dispatch(getListOrdersReq({ date, typeUsers: activeSelectRole?.value }));
  };

  const onChangeWS = (status) => {
    const date = format(activeDateDay, 'yyyy-MM-dd', { locale: ru });
    dispatch(getListOrdersReq({ date, typeUsers: status?.value }));
    dispatch(activeSelectRoleFN(status));
  };

  const createOrder = () => {
    navigate('/order/choice_user', { state: {} });
  };

  return (
    <div className="tableOrders">
      <MainCard
        title={
          <>
            Список заказов ({listOrders?.length})
            <div className="actionsOrders">
              <button className="generatePdf updated" onClick={getData}>
                Обновить
              </button>

              <Select
                options={listTypeUsers}
                className="select"
                onChange={onChangeWS}
                value={activeSelectRole}
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
                    padding: 0
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
                  menuPortal: (base) => ({ ...base, zIndex: 9999 })
                }}
              />
              <div className="datePicker">
                <DatePicker
                  selected={parse(activeDateDay, 'yyyy-MM-dd', new Date())}
                  onChange={onChangeDate}
                  yearDropdownItemNumber={100}
                  placeholderText="ДД.ММ.ГГГГ"
                  shouldCloseOnSelect={true}
                  scrollableYearDropdown
                  dateFormat="dd.MM.yyyy"
                  locale={ru}
                  maxDate={new Date()}
                />
              </div>
              <button className="generatePdf">Сгенерировать отчёт</button>
              <button className="generatePdf createOrder" onClick={createOrder}>
                Создать заказ
              </button>
            </div>
          </>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 50px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="viewUsersPage">
          <TableVirtuoso
            data={listOrders}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={(index, row) => rowContent(index, row, navigate)}
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

function rowContent(_index, row, navigate) {
  const viewApartment = () => {
    navigate('/order/every', { state: row });
    console.log(row);
  };

  return columns?.map((column) => {
    if (column?.dataKey == 'orderNumber') {
      return (
        <TableCell key={column?.dataKey} sx={{ padding: 1, paddingLeft: 2, paddingRight: 0 }} onClick={viewApartment}>
          <p className="textTable">{row?.orderNumber}</p>
        </TableCell>
      );
    }
    if (column?.dataKey == 'startTime') {
      return (
        <TableCell key={column?.dataKey} align="left" onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <p className="textTable">{row?.startTime}</p>
        </TableCell>
      );
    }
    if (column?.dataKey == 'endTime') {
      return (
        <TableCell key={column?.dataKey} align="left" onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <p className="textTable">{row?.endTime}</p>
        </TableCell>
      );
    }
    if (column?.dataKey == 'total_price') {
      return (
        <TableCell key={column?.dataKey} align="left" onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <p className="textTable"> {row?.total_price} сом</p>
        </TableCell>
      );
    }
    if (column?.dataKey == 'lockCode') {
      return (
        <TableCell key={column?.dataKey} align="left" onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <p className="textTable">{row?.lockCode || '...'}#</p>
        </TableCell>
      );
    }
    if (column?.dataKey == 'createdByUser') {
      return (
        <TableCell key={column?.dataKey} align="left" onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          <p className="textTable">{objRole?.[row?.createdByUser]}</p>
        </TableCell>
      );
    }
    if (column?.dataKey == 'isCheckExtend') {
      return (
        <TableCell key={column?.dataKey} align="left" onClick={viewApartment} sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}>
          {row?.isCheckExtend ? <p className="textTable">Да</p> : <p className="textTable">Нет</p>}
        </TableCell>
      );
    }
    if (column?.dataKey == 'orderStatus') {
      return (
        <TableCell
          className="orderStatus"
          onClick={viewApartment}
          key={column?.dataKey}
          sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
        >
          <p className="statusOrder" style={{ color: orderStatus?.[row?.orderStatus]?.color }}>
            {orderStatus?.[row?.orderStatus]?.text}
          </p>
        </TableCell>
      );
    }
  });
}

export default ListOrdersPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

const columns = [
  { width: '8%', label: '№', dataKey: 'orderNumber' },
  { width: '16%', label: 'Начало', dataKey: 'startTime' },
  { width: '16%', label: 'Конец', dataKey: 'endTime' },
  { width: '12%', label: 'Сумма', dataKey: 'total_price' },
  { width: '12%', label: 'Код замка', dataKey: 'lockCode' },
  { width: '14%', label: 'Создатель', dataKey: 'createdByUser' },
  { width: '12%', label: 'Продлевался ли заказ', dataKey: 'isCheckExtend' },
  { width: '12%', label: 'Статус', dataKey: 'orderStatus' }
];
