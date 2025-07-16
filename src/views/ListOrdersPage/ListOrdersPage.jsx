////////// hooks
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/system';

/////// fns
import { activeDateDayFN, activeSelectDatesFN, activeSelectRoleFN, getListOrdersReq, listOrdersFN } from 'store/reducers/orderSlice';
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
import Titles from 'common/Titles/Titles';

///// enums
import { listDatesOrders, listTypeUsers, objRole, orderStatus } from 'helpers/myLocal';

////// style
import './style.scss';
import { styleMainSelect } from './style';

////// icons
import RestartAltIcon from '@mui/icons-material/RestartAlt';

//// список арендодателей
const ListOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmall700 = useMediaQuery('(max-width:700px)');
  const isSmall800 = useMediaQuery('(max-width:800px)');
  const isSmall = useMediaQuery('(max-width:550px)');

  const { listOrders } = useSelector((state) => state.orderSlice);
  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { activeDateDay, activeSelectRole, activeSelectDates } = useSelector((state) => state.orderSlice);

  console.log(dataSave, 'dataSave');

  useEffect(() => {
    getData();
    return () => dispatch(listOrdersFN([]));
  }, []);

  const getData = () => {
    // const date = format(activeDateDay, 'yyyy-MM-dd', { locale: ru });
    dispatch(getListOrdersReq({ date: null, typeUsers: activeSelectRole?.value, typesDate: activeSelectDates?.value }));
  };

  const onChangeWS = (status, { name }) => {
    if (name == 'typeUsers') {
      dispatch(getListOrdersReq({ date: null, typeUsers: status?.value, typesDate: activeSelectDates?.value }));
      dispatch(activeSelectRoleFN(status));
    } else if (name == 'typesDate') {
      dispatch(getListOrdersReq({ date: null, typesDate: status?.value, typeUsers: activeSelectRole?.value }));
      dispatch(activeSelectDatesFN(status));
    }
  };

  const createOrder = () => {
    navigate('/order/choice_user', { state: {} });
  };

  // const onChangeDate = (value) => {
  //   const date = format(value, 'yyyy-MM-dd', { locale: ru });
  //   dispatch(activeDateDayFN(date));
  //   dispatch(getListOrdersReq({ date: null, typeUsers: activeSelectRole?.value }));
  // };

  return (
    <div className="my_tables tableOrders">
      <MainCard
        title={
          <div className="actionsOrders">
            <div className="actionsOrders__header_mobile">
              <Titles title={`Список заказов (${listOrders?.length})`} viewPrev={false} />
              {isSmall700 && (
                <div className="actionsOrders__actions_btn">
                  <button className="standartBtn reload" onClick={getData}>
                    {isSmall ? <RestartAltIcon /> : 'Обновить'}
                  </button>
                  <button className="standartBtn create_order" onClick={createOrder}>
                    Создать
                  </button>
                </div>
              )}
            </div>

            <hr />

            <div className="actionsOrders__inner">
              {!isSmall700 && (
                <button className="standartBtn reload" onClick={getData}>
                  {isSmall800 ? <RestartAltIcon /> : 'Обновить'}
                </button>
              )}

              <Select
                options={listTypeUsers}
                className="select"
                onChange={onChangeWS}
                value={activeSelectRole}
                menuPortalTarget={document.body}
                name="typeUsers"
                styles={{
                  ...styleMainSelect,
                  container: (base) => ({
                    ...base,
                    width: isSmall700 ? '100%' : 150
                  })
                }}
              />

              <Select
                options={listDatesOrders}
                className="select"
                onChange={onChangeWS}
                value={activeSelectDates}
                menuPortalTarget={document.body}
                name="typesDate"
                styles={{
                  ...styleMainSelect,
                  container: (base) => ({
                    ...base,
                    width: isSmall700 ? '100%' : 150
                  })
                }}
              />

              {!isSmall700 && (
                <button className="standartBtn create_order" onClick={createOrder}>
                  Создать заказ
                </button>
              )}

              {/* //// на будущее */}
              {/* <div className="datePicker">
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
                  calendarClassName="dark-calendar"
                  className="dark-input"
                  dayClassName={(date) => {
                    return date > new Date() ? 'future-date-disabled' : undefined;
                  }}
                />
              </div> */}
            </div>
          </div>
        }
      >
        <div className="my_tables__inner">
          <TableVirtuoso
            data={listOrders}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => fixedHeaderContent(isSmall)}
            itemContent={(index, row) => rowContent(index, row, navigate, isSmall, listOrders)}
          />
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

function rowContent(_index, row, navigate, isSmall, listOrders) {
  const viewApartment = () => {
    navigate('/order/every', { state: row });
  };

  const columnsMobile = [{ width: '100%', label: '№', dataKey: 'codeid' }];

  const prevRow = _index > 0 ? listOrders?.[_index - 1] : null;
  const showDate = !prevRow || row.startDate !== prevRow?.startDate;

  const nextRow = _index < listOrders.length - 1 ? listOrders?.[_index + 1] : null;
  const isBeforeDate = !nextRow || row.startDate !== nextRow?.startDate;

  if (isSmall) {
    return columnsMobile?.map((column, index) => {
      return (
        <TableCell className="mobileListOrder" key={index}>
          <div
            className={`${showDate ? '' : 'pushTop'} everyorderMobile`}
            onClick={viewApartment}
            style={{ marginTop: showDate ? '35px' : '0px' }}
          >
            {showDate && <div className="dateTime">{row?.startDate}</div>}
            <h6>Бронь № {row?.orderNumber}</h6>

            <div className="rowItem">
              <strong>Начало аренды:</strong>
              <span>{row?.startTime}</span>
            </div>

            <div className="rowItem">
              <strong>Конец аренды:</strong>
              <span>{row?.endTime}</span>
            </div>

            <div className="rowItem">
              <strong>Уборка с:</strong>
              <span>{row?.cleaningStartTime}</span>
            </div>

            <div className="rowItem">
              <strong>Уборка до:</strong>
              <span>{row?.cleaningEndTime}</span>
            </div>

            <div className="rowItem total">
              <strong>Сумма:</strong>
              <span>{row?.total_price} сом</span>
            </div>

            <div className="rowItem">
              <strong>Пароль замка на время аренды:</strong>
              <span>{row?.lockCode}#</span>
            </div>

            <div className="rowItem">
              <strong>Постоянный пароль арендодателя:</strong>
              <span>{row?.lockCodeLandlord}#</span>
            </div>

            <div className="rowItem status">
              <strong>Статус:</strong>
              <span style={{ color: orderStatus?.[row?.orderStatus]?.color }}>{orderStatus?.[row?.orderStatus]?.text}</span>
            </div>
          </div>
        </TableCell>
      );
    });
  } else {
    return columns?.map((column) => {
      if (column?.dataKey == 'orderNumber') {
        return (
          <TableCell
            key={column?.dataKey}
            className={`${showDate ? 'withDate' : ''} ${isBeforeDate ? 'withDateBefore' : ''}`}
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 0 }}
            onClick={viewApartment}
          >
            <p className="textTable">{row?.orderNumber}</p>
            {showDate && <div className="startDateHeader">{row?.startDate}</div>}
          </TableCell>
        );
      }
      if (column?.dataKey == 'startTime') {
        return (
          <TableCell
            className={`${showDate ? 'withDate' : ''} ${isBeforeDate ? 'withDateBefore' : ''}`}
            key={column?.dataKey}
            align="left"
            onClick={viewApartment}
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
          >
            <p className="textTable">{row?.startTime}</p>
          </TableCell>
        );
      }
      if (column?.dataKey == 'endTime') {
        return (
          <TableCell
            className={`${showDate ? 'withDate' : ''} ${isBeforeDate ? 'withDateBefore' : ''}`}
            key={column?.dataKey}
            align="left"
            onClick={viewApartment}
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
          >
            <p className="textTable">{row?.endTime}</p>
          </TableCell>
        );
      }
      if (column?.dataKey == 'total_price') {
        return (
          <TableCell
            className={`${showDate ? 'withDate' : ''} ${isBeforeDate ? 'withDateBefore' : ''}`}
            key={column?.dataKey}
            align="left"
            onClick={viewApartment}
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
          >
            <p className="textTable"> {row?.total_price} сом</p>
          </TableCell>
        );
      }
      if (column?.dataKey == 'lockCode') {
        return (
          <TableCell
            className={`${showDate ? 'withDate' : ''} ${isBeforeDate ? 'withDateBefore' : ''}`}
            key={column?.dataKey}
            align="left"
            onClick={viewApartment}
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
          >
            <p className="textTable">{row?.lockCode || '...'}#</p>
          </TableCell>
        );
      }
      if (column?.dataKey == 'createdByUser') {
        return (
          <TableCell
            className={`${showDate ? 'withDate' : ''} ${isBeforeDate ? 'withDateBefore' : ''}`}
            key={column?.dataKey}
            align="left"
            onClick={viewApartment}
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
          >
            <p className="textTable">{objRole?.[row?.createdByUser]}</p>
          </TableCell>
        );
      }
      if (column?.dataKey == 'isCheckExtend') {
        return (
          <TableCell
            key={column?.dataKey}
            align="left"
            onClick={viewApartment}
            className={`isCheckExtend ${showDate ? 'withDate' : ''}  ${isBeforeDate ? 'withDateBefore' : ''}`}
            sx={{ padding: 1, paddingLeft: 2, paddingRight: 2 }}
          >
            {row?.isCheckExtend ? <p className="textTable">Да</p> : <p className="textTable">Нет</p>}
          </TableCell>
        );
      }
      if (column?.dataKey == 'orderStatus') {
        return (
          <TableCell
            className={`orderStatus ${showDate ? 'withDate' : ''}  ${isBeforeDate ? 'withDateBefore' : ''}`}
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
