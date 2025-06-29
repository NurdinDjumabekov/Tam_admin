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
import SendInput from 'common/SendInput/SendInput';
import SaveAsIcon from '@mui/icons-material/SaveAs';

////// helpers
import { listUnit } from 'helpers/myLocal';
import { crudEquipmentReq, getEquipmentReq } from 'store/reducers/apartmentsSlice';
import PreloaderMini from 'common/PreloaderMini/PreloaderMini';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';

/////// fns

const CrudEquipment = (props) => {
  const { crudEquipment, setCrudEquipment } = props;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCrudEquipment({ ...crudEquipment, [e.target.name]: e.target.value });
  };

  const handleClose = () => setCrudEquipment({});

  const onChangeWS = (unit) => setCrudEquipment({ ...crudEquipment, unit });

  const crudEquipmentFn = async (e) => {
    e?.preventDefault();
    const result = await dispatch(crudEquipmentReq(crudEquipment)).unwrap();
    if (result.res == 1) {
      dispatch(getEquipmentReq({ guid_apartment: crudEquipment.guid }));
      setCrudEquipment({});
    } else {
      myAlert(result.mes, 'error');
    }
  };

  return (
    <>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={[1, 2].includes(crudEquipment?.action_type)}>
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ fontSize: 18 }} id="customized-dialog-title">
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            {crudEquipment?.action_type == 1 ? 'Введите данные' : 'Редактирование'}
            <PreloaderMini />
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form className="crudUsers crudLandlords crudEquipment__inner" onSubmit={crudEquipmentFn}>
            <SendInput required={true} value={crudEquipment?.name} onChange={onChange} title={'Наименование'} name={'name'} />
            <SendInput
              type={'number'}
              required={true}
              value={crudEquipment?.count}
              onChange={onChange}
              title={'Количетсво'}
              name={'count'}
            />
            <div className="myInputs">
              <h5>Ед. измерения</h5>
              <Select
                options={listUnit}
                className="select"
                onChange={onChangeWS}
                value={crudEquipment?.unit}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 })
                }}
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
        state={crudEquipment?.action_type == 3}
        title={`Удалить "${crudEquipment?.name}" ?`}
        yesFN={() => crudEquipmentFn(null)}
        noFN={handleClose}
      />
    </>
  );
};

export default CrudEquipment;

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));
