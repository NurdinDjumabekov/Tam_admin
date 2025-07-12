import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import './style.scss';
import { getEveryOrdersReq } from 'store/reducers/orderSlice';
import { listAllConveniencesFN } from 'store/reducers/otherActionApartmentSlice';
import { objRole, orderStatus, paymentTypes } from 'helpers/myLocal';
import { getEveryDocumentReq } from 'store/reducers/docsSlice';
import { myAlert } from 'helpers/myAlert';

////// icons
import EditIcon from 'assets/MyIcons/EditIcon';
import Titles from 'common/Titles/Titles';
import AddIcon from 'assets/MyIcons/AddIcon';
import DeleteIcon from 'assets/MyIcons/DeleteIcon';

const CrudOrdersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { everyOrder } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    if (location?.state?.guid) {
      dispatch(getEveryOrdersReq({ guid: location?.state?.guid }));
    }

    return () => dispatch(listAllConveniencesFN([]));
  }, [location.state.guid]);

  const clickDocument = async ({ guid }) => {
    const result = await dispatch(getEveryDocumentReq(guid)).unwrap();

    if (result?.res == 1) {
      window.open(result.url, '_blank');
    } else {
      myAlert(result?.mes, 'error');
    }
  };

  const viewVideo = (video) => {
    navigate('/every/view_every_apartment_video', { state: { video } });
  };

  const editCleaningTimes = (order) => {
    const state = {
      cleaningStartTime: order?.cleaningStartTime,
      cleaningEndTime: order?.cleaningEndTime,
      orderGuid: order?.guid
    };
    navigate('/order/crud_cleaning_times', { state });
  };

  const crudPasswordLock = (order) => {
    const state = {
      startTime: order?.startTime,
      endTime: order?.endTime,
      orderGuid: order?.guid,
      lockCode: order?.lockCode,
      lockCodeId: order?.lockCodeId
    };
    navigate('/order/crud_password_lock', { state });
  };

  const crudPayOrder = (order) => {
    navigate('/order/crud_pay_order', { state: { orderGuid: order?.guid, order, action_type: 1 } });
  };

  const delTariff = async (order, pay) => {
    const state = { orderGuid: order?.guid, order, action_type: 3, pay };
    navigate('/order/crud_pay_order', { state });
  };

  const crudStartEndOrderTime = (order) => {
    navigate('/order/crud_start_end_order', { state: order });
  };

  const crudStatusOrder = (order) => {
    navigate('/order/crud_status_order', { state: { order, action_type: 2 } });
  };

  return (
    <div className="container tableOrders crudTableOrders crudInfoOrder">
      <MainCard
        title={<Titles title={`Информация о заказе №${everyOrder?.orderNumber}`} />}
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 0 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="orderTableWrapper">
          <table className="orderInfoTable">
            <tbody>
              <tr>
                <th colSpan={3}>Основная информация</th>
              </tr>
              <tr>
                <td>Номер заказа</td>
                <td>{everyOrder?.orderNumber}</td>
                <td></td>
              </tr>
              <tr>
                <td>Статус</td>
                <td>{orderStatus?.[everyOrder?.orderStatus]?.text}</td>
                <td>
                  <button className="editData" onClick={() => crudStatusOrder(everyOrder)}>
                    <EditIcon width="18" height="18" title={''} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>Создал</td>
                <td>
                  {everyOrder?.createdByUser?.firstName} {everyOrder?.createdByUser?.name} ({objRole?.[everyOrder?.createdByUser?.typeUser]}
                  )
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Дата создания</td>
                <td>{everyOrder?.createdAt}</td>
                <td></td>
              </tr>
              <tr>
                <td>Начало аренды</td>
                <td>{everyOrder?.startTime}</td>
                <td>
                  <button onClick={() => crudStartEndOrderTime(everyOrder)} className="editData">
                    <EditIcon width="18" height="18" title={''} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>Конец аренды</td>
                <td>{everyOrder?.endTime}</td>
                <td>
                  <button onClick={() => crudStartEndOrderTime(everyOrder)} className="editData">
                    <EditIcon width="18" height="18" title={''} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>Продлевался ли заказ</td>
                <td>{everyOrder?.isCheckExtend ? 'Да' : 'Нет'}</td>
                <td></td>
              </tr>
              <tr>
                <td>Установлен ли замок</td>
                <td>{everyOrder?.apartment?.installLock ? 'Да' : 'Нет'}</td>
                <td></td>
              </tr>
              <tr>
                <td>Промокод</td>
                <td>
                  {!!everyOrder?.promoCodeGuid
                    ? `${everyOrder?.promoCodeObj?.code}, скидка: ${everyOrder?.promoCodeObj?.discountPercent}%`
                    : 'Не применялся'}
                </td>
                <td></td>
              </tr>
              <tr>
                <th colSpan={2}>Оплата и тарифы</th>
                <th className="titleAction">
                  <button className="editData" onClick={() => crudPayOrder(everyOrder)}>
                    <AddIcon width="18" height="18" title={'Продление аренды'} />
                  </button>
                </th>
              </tr>
              <tr>
                <td>Тарифы</td>
                <td>{everyOrder?.tariff}</td>
                <td></td>
              </tr>
              {everyOrder?.listPay?.map((i, idx) => (
                <tr key={idx}>
                  <td>
                    Оплата {idx + 1}: '{paymentTypes?.[i?.type_pay]}'
                  </td>
                  <td>{i?.paid_summ} сом</td>
                  <td>
                    <button className="editData" onClick={() => delTariff(everyOrder, i)}>
                      <DeleteIcon width="18" height="18" title={'Удаление тарифа аренды'} color="red" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>Итого</td>
                <td>{everyOrder?.total_price} сом</td>
                <td></td>
              </tr>

              <tr>
                <th colSpan={3}>Квартира</th>
              </tr>
              <tr>
                <td>Адрес</td>
                <td>
                  {[
                    everyOrder?.apartment?.address?.city,
                    `район ${everyOrder?.apartment?.address?.district}`,
                    everyOrder?.apartment?.address?.addressName,
                    everyOrder?.apartment?.address?.houseNumber
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Пароль во время аренды</td>
                <td>{everyOrder?.lockCode}#</td>
                <td>
                  <button className="editData" onClick={() => crudPasswordLock(everyOrder)}>
                    <EditIcon width="18" height="18" title={'Редактирование пароля'} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>Постоянный пароль</td>
                <td>{everyOrder?.apartment?.lock?.lockCodeStandart}#</td>
                <td></td>
              </tr>
              <tr>
                <td>Видео входа в квартиру</td>
                <td className="video">
                  <p>{everyOrder?.apartment?.videoOfTheEntrance}</p>
                  <button onClick={() => viewVideo(everyOrder?.apartment?.videoOfTheEntrance)} className="clickDoc">
                    Посмотреть видео
                  </button>{' '}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Видео квартиры</td>
                <td className="video">
                  <p>{everyOrder?.apartment?.video}</p>
                  <button onClick={() => viewVideo(everyOrder?.apartment?.video)} className="clickDoc">
                    Посмотреть видео
                  </button>
                </td>
                <td></td>
              </tr>

              <tr>
                <th colSpan={3}>Уборка</th>
              </tr>
              <tr>
                <td>Начало уборки</td>
                <td>{everyOrder?.cleaningStartTime}</td>
                <td>
                  <button className="editData" onClick={() => editCleaningTimes(everyOrder)}>
                    <EditIcon width="18" height="18" title={''} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>Конец уборки</td>
                <td>{everyOrder?.cleaningEndTime}</td>
                <td>
                  <button className="editData" onClick={() => editCleaningTimes(everyOrder)}>
                    <EditIcon width="18" height="18" title={''} />
                  </button>
                </td>
              </tr>

              <tr>
                <th colSpan={2}>Документы</th>
                <th className="titleAction"></th>
              </tr>
              {everyOrder?.listGuidsDocs?.map((doc, idx) => (
                <tr key={idx}>
                  <td>{doc?.title}</td>
                  <td>
                    <button onClick={() => clickDocument(doc)} className="clickDoc">
                      Посмотреть документ
                    </button>{' '}
                  </td>
                  <td></td>
                </tr>
              ))}

              {everyOrder?.comment !== '.' && (
                <>
                  <tr>
                    <th colSpan={3}>Отзыв</th>
                  </tr>
                  <tr>
                    <td>Комментарий пользователя</td>
                    <td>{everyOrder?.comment}</td>
                    <td></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </MainCard>
    </div>
  );
};

export default CrudOrdersPage;

// <Dialog
//   fullScreen={fullScreen}
//   open
//   onClose={close}
//   aria-labelledby="dialog-title"
//   className="menuActionApartment"
//   PaperProps={{
//     sx: {
//       borderRadius: 3,
//       minWidth: 360,
//       paddingX: 1,
//       paddingY: 1
//     }
//   }}
// >
//   <div className="modalActionApartment">
//     <div className="header">
//       <DialogTitle id="dialog-title">Выберите действие</DialogTitle>
//       <IconButton onClick={close}>
//         <CloseIcon />
//       </IconButton>
//     </div>

//     <Paper elevation={0}>
//       <List disablePadding>
//         <ListItemButton onClick={() => handleAction(1)}>
//           <ListItemIcon>
//             <EditIcon width="18" height="18" title={''} />
//           </ListItemIcon>
//           <ListItemText primary="Информация о квартире" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(2)}>
//           <ListItemIcon>
//             <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title={''} />
//           </ListItemIcon>
//           <ListItemText primary="Удалить квартиру" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(3)}>
//           <ListItemIcon>
//             <img className="listIcon" src={imgList} alt="*" width={16} height={16} />
//           </ListItemIcon>
//           <ListItemText primary="Правила квартиры" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(4)}>
//           <ListItemIcon>
//             <img className="listIcon" src={imgListConv} alt="*" width={16} height={16} />
//           </ListItemIcon>
//           <ListItemText primary="Удобства квартиры" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(5)}>
//           <ListItemIcon>
//             <MapIcon width="18" height="18" title={''} />
//           </ListItemIcon>
//           <ListItemText primary="Посмотреть на карте" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(6)}>
//           <ListItemIcon>
//             <img className="payIcon" src={imgPay} alt="*" width={16} height={16} />
//           </ListItemIcon>
//           <ListItemText primary="Прайс квартиры" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(7)}>
//           <ListItemIcon>
//             <img className="payIcon" src={imgGalery} alt="*" width={19} height={19} />
//           </ListItemIcon>
//           <ListItemText primary="Фотографии квартиры" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(8)}>
//           <ListItemIcon>
//             <img className="videoIcon" src={imgVideo} alt="*" width={19} height={19} />
//           </ListItemIcon>
//           <ListItemText primary="Видео квартиры" />
//         </ListItemButton>

//         <ListItemButton onClick={() => handleAction(9)}>
//           <ListItemIcon>
//             <img className="videoIcon" src={imgDoor} alt="*" width={19} height={19} />
//           </ListItemIcon>
//           <ListItemText primary="Данные замка" />
//         </ListItemButton>
//       </List>
//     </Paper>
//   </div>
// </Dialog>
