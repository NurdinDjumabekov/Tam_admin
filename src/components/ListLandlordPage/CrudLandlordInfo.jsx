//////// hooks
import * as React from 'react';
import { useDispatch } from 'react-redux';

////// components
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import Select from 'react-select';

////// style
import { styled } from '@mui/material/styles';
import './style.scss';

////// icons
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';
import SendInput from 'common/SendInput/SendInput';
import SaveAsIcon from '@mui/icons-material/SaveAs';

/////// fns
import { crudLandLordReq, getAllLandLordReq } from 'store/reducers/usersSlice';

/////// helpers
import { listActive } from 'helpers/myLocal';
import { myAlert } from 'helpers/myAlert';

const CrudLandlordInfo = (props) => {
  const { crudLandlord, setCrudLandlord } = props;
  const dispatch = useDispatch();

  const crudLandLordFn = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    const result = await dispatch(crudLandLordReq({ ...crudLandlord, status: crudLandlord.status.value })).unwrap();
    if (result.res == 1) {
      setCrudLandlord({});
      dispatch(getAllLandLordReq({ typeUsers: 'landlord', searchUser: '' }));
      myAlert(result.mes);
    } else {
      myAlert(result.mes, 'error');
    }
  };

  const handleClose = () => setCrudLandlord({});

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone_number') {
      const onlyDigits = value.replace(/\D/g, '').slice(0, 12);
      setCrudLandlord({ ...crudLandlord, [name]: onlyDigits });
    } else {
      setCrudLandlord({ ...crudLandlord, [name]: value });
    }
  };

  const onChangeWS = (status) => setCrudLandlord({ ...crudLandlord, status });

  return (
    <>
      <BootstrapDialog
        className="parentCrudLandlords"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={[1, 2].includes(crudLandlord?.action_type)}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ fontSize: 18 }} id="customized-dialog-title">
          {crudLandlord?.action_type == 1 ? 'Введите данные' : 'Редактирование'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form className="crudUsers crudLandlords" onSubmit={crudLandLordFn}>
            <SendInput required={true} value={crudLandlord?.firstName} onChange={onChange} title={'Фамилие'} name={'firstName'} />
            <SendInput required={true} value={crudLandlord?.name} onChange={onChange} title={'Имя'} name={'name'} />
            <SendInput required={true} value={crudLandlord?.lastName} onChange={onChange} title={'Отчетсво'} name={'lastName'} />
            <SendInput
              required={true}
              value={crudLandlord?.phoneNumber}
              onChange={onChange}
              title={'Номер (WhatsApp)'}
              name={'phoneNumber'}
              placeholder={'996*********'}
              type="number"
            />
            <div className="myInputs">
              <h5>Статус</h5>
              <Select
                options={listActive}
                className="select"
                onChange={onChangeWS}
                value={crudLandlord?.status}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>
            <button className="saveData" type="submit">
              <SaveAsIcon sx={{ width: 19, height: 19 }} />
              <p>Сохранить</p>
            </button>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <ConfirmModal
        state={crudLandlord?.action_type == 3}
        title={`Удалить "${crudLandlord?.name}" ?`}
        yesFN={() => crudLandLordFn(null)}
        noFN={() => setCrudLandlord({})}
      />
    </>
  );
};
export default CrudLandlordInfo;

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));
