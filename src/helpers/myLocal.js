export const listActive = [
  { value: 'verified', label: 'Активен' },
  { value: 'blocked', label: 'Заблокирован' }
];

export const listUnit = [
  { value: '1', label: 'Шт' },
  { value: '2', label: 'Пачка' },
  { value: '3', label: 'Кг' },
  { value: '4', label: 'Компл' }
];

export const listCountApartnment = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
];

export const listActiveApartment = [
  { value: 'active', label: 'Активный' },
  { value: 'blocked', label: 'Заблокирован' }
];

export const listBollean = [
  { value: 'true', label: 'Да' },
  { value: 'false', label: 'Нет' }
];

export const listPrice = [
  { value: '1', label: '1 час' },
  { value: '2', label: '2 часа' },
  { value: '3', label: '3 часа' },
  { value: '4', label: '4 часа' },
  { value: '5', label: '5 часов' },
  { value: '10', label: '10 часов' },
  { value: '12', label: '12 часов' },
  { value: '24', label: '24 часа' }
];

export const orderStatus = {
  reserved: { color: '#d7d7d795', text: 'Пустой заказ' },
  in_process_pay: { color: '#d7d7d795', text: 'Бронь оплачивается (аренда еще не началась)' },
  prepaid: { color: 'rgba(255, 0, 0, 0.493)', text: 'Оплачено 15% (аренда еще не началась)' },
  paid: { color: '#d7d7d795', text: 'Оплатили 100%, в процессе выполнения' },
  cancelled: { color: 'rgba(255, 0, 0, 0.493)', text: 'Отменён (досрочное завершение, надо вернуть 100% пользователю)' },
  refunded: { color: 'rgba(255, 0, 0, 0.493)', text: 'Отменён (досрочное завершение, надо вернуть 85% пользователю)' },
  success: { color: 'green', text: 'Успешно (аренда сама завершилась)' },
  success_user: { color: 'green', text: 'Успешно  (аренду завершил пользователь)' },
  cuccess_no_full_pay: { color: '#d7d7d795', text: 'Аренда закончилась (досроное завершение из-за полной неуплаты)' },
  early_completion: { color: '#d7d7d795', text: 'Досрочное завершение без возврата' }
};

export const listTypeUsers = [
  { value: '', label: 'Все' },
  { value: 'admin', label: 'Админ' },
  { value: 'client', label: 'Клиенты' },
  { value: 'landlord', label: 'Арендодатели' }
];

export const listDatesOrders = [
  { value: '1', label: 'Заказы за сегодня' },
  { value: '2', label: 'Заказы за последние 3 дня' },
  { value: '3', label: 'Заказы за последние 5 дней' },
  { value: '4', label: 'Заказы за неделю' },
  { value: '5', label: 'Заказы за месяц' },
  { value: '6', label: 'Заказы за 2 месяца' },
  { value: '7', label: 'Заказы за 3 месяца' }
];

export const objRole = {
  admin: 'Админ',
  client: 'Пользователь',
  landlord: 'Арендодатель'
};

export const paymentTypes = {
  full: 'Полная оплата тарифа', // 100%
  mini: '15% оплаты тарифа', // 15%
  big: '85% оплаты тарифа', // 85%
  more: 'доп предление' // 100% продление
};

// export enum OrderStatus {
//   Reserved = 'reserved', // 0% оплаты — слот не занят
//   InProcessPay = 'in_process_pay', // 0% но в процессе оплаты — слот занят на 3 минуты
//   Prepaid = 'prepaid', // 15% оплаты — слот занят
//   Paid = 'paid', // 100% оплаты — слот занят + доступ выдается
//   Cancelled = 'cancelled', // отменено возвращены деньги (100%)
//   Refunded = 'refunded', // возвращены деньги (85%)
//   Success = 'success', // успешно (сервер сам завершил работу)
//   SuccessUser = 'success_user', // успешно (user сам завершил работу)
//   SuccessNoFullPay = 'cuccess_no_full_pay', // успешно завершено, но user не оплатил всю сумму
//   // (если в течении 10 мин не оплатил, то завершаем аренду)
//   EarlyCompletion = 'early_completion', // досрочное завершение без возврата денег
// }

const generateTimeOptions = () => {
  const options = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      if (h === 0 && m === 0) continue;
      const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      options.push({ value: timeStr, label: timeStr });
    }
  }

  return options;
};

export const timeOptions = generateTimeOptions();

export const findTimes = (targetTime, options) => {
  const [targetH, targetM] = targetTime.split(':').map(Number);
  const targetMinutes = targetH * 60 + targetM;

  let closest = options[0];
  let minDiff = Infinity;

  for (const opt of options) {
    const [h, m] = opt.value.split(':').map(Number);
    const optionMinutes = h * 60 + m;
    const diff = Math.abs(optionMinutes - targetMinutes);

    if (diff < minDiff) {
      closest = opt;
      minDiff = diff;
    }
  }

  return closest;
};

export const listStatusOrder = [
  { value: 'reserved', label: 'Деактивировать (заказ сохранит данные, но не будет занимать временные слоты)' },
  { value: 'prepaid', label: 'Оплатили 15%' },
  { value: 'paid', label: 'Оплатили 100% (квартира забронирована)' },

  { value: 'early_completion', label: 'Досрочное завершение без возврата денег' },
  {
    value: 'cuccess_no_full_pay',
    label: 'Успешно завершено, но user не оплатил всю сумму (пароль не был выдан и клиент не посещал квартиру)'
  },
  {
    refunded: 'paid',
    label: 'Возвращены деньги (85%), (если клиент оплатил, но отменил более чем за сутки, то удерживается 15%, остальные 85% возвращаются)'
  },
  { value: 'cancelled', label: 'Отменено, возвращены деньги (100%)' }
];

export const listStatusOrderForStart = [
  { value: 'reserved', label: 'Деактивировать (заказ сохранит данные, но не будет занимать временные слоты)' },
  { value: 'prepaid', label: 'Оплатили 15%' },
  { value: 'paid', label: 'Оплатили 100% (забронировать квартиру)' }
];

export const listStatusOrderForAdmin = [
  { value: 'reserved', label: 'Деактивировать (заказ сохранит данные, но не будет занимать временные слоты)' },
  { value: 'paid', label: 'Оплатили 100% (забронировать квартиру)' }
];

export const listTypesOrder = [
  { value: 'tamkg', label: 'Бронь для клиента' },
  { value: 'landlords', label: 'Бронь для арендодателя' }
];

export const objTypeOrder = {
  tamkg: 'client',
  landlords: 'landlord'
};
