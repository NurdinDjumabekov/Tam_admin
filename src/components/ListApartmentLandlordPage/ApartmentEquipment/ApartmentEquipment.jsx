//////// hooks
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

////// components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import CrudEquipment from '../CrudEquipment/CrudEquipment';

////// style
import { styled } from '@mui/material/styles';
import './style.scss';

////// icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

/////// fns
import { listEquipmentFn } from 'store/reducers/apartmentsSlice';
import PreloaderMini from 'common/PreloaderMini/PreloaderMini';
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import EditIcon from 'assets/MyIcons/EditIcon';
import { listUnit } from 'helpers/myLocal';

const ApartmentEquipment = (props) => {
  const { viewEquipment, setViewEquipment } = props;
  const dispatch = useDispatch();
  const [crudEquipment, setCrudEquipment] = useState({});

  const { listEquipment } = useSelector((state) => state.apartmentsSlice);

  const handleClose = () => {
    dispatch(listEquipmentFn([]));
    setViewEquipment({});
  };

  const clickEquipment = (action_type, row) => {
    if (action_type == 1) {
      setCrudEquipment({ guid: viewEquipment?.guid, action_type, unit: { value: '1', label: 'Шт' }, count: 1 });
    }
    if (action_type == 2) {
      const objUnit = listUnit?.filter((i) => i?.value == row?.unit_value);
      setCrudEquipment({ ...row, action_type, unit: objUnit?.[0] });
    }
    if (action_type == 3) {
      setCrudEquipment({ guid: viewEquipment?.guid, action_type, name: row?.name });
    }
  };

  return (
    <>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={!!viewEquipment.guid}>
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ fontSize: 18 }} id="customized-dialog-title">
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            Оснащение квартиры ({viewEquipment?.addres}) <PreloaderMini />
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {listEquipment?.length == 0 ? (
            <p className="emptyApartmentEquipment">Список пустой</p>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="equipment table">
                <TableHead>
                  <TableRow>
                    <TableCell>Наименование</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Ед. измерения</TableCell>
                    <TableCell>...</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listEquipment?.map((row) => (
                    <TableRow key={row?.name}>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.count}</TableCell>
                      <TableCell>{row?.unit}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
                          <button onClick={() => clickEquipment(2, row)}>
                            <EditIcon width="18" height="18" />
                          </button>
                          <button onClick={() => clickEquipment(3, row)}>
                            <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <button className="saveData" onClick={() => clickEquipment(1, {})}>
            <AddIcon sx={{ width: 19, height: 19 }} />
            <p>Добавить оснащение</p>
          </button>
        </DialogContent>
      </BootstrapDialog>
      <CrudEquipment crudEquipment={crudEquipment} setCrudEquipment={setCrudEquipment} />
    </>
  );
};

export default ApartmentEquipment;

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));
