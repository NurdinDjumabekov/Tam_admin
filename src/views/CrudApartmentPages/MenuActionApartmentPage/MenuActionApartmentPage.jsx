import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/system';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

////// style
import './style.scss';

////// icons
import EditIcon from 'assets/MyIcons/EditIcon';
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import MapIcon from 'assets/MyIcons/MapIcon';
import imgPay from '../../../assets/images/icons/pay.svg';
import imgGalery from '../../../assets/images/icons/galery.svg';
import imgList from '../../../assets/images/icons/list.svg';
import imgVideo from '../../../assets/images/icons/video.svg';
import imgListConv from '../../../assets/images/icons/list_convencies.svg';
import imgDoor from '../../../assets/images/icons/door.svg';

const MenuActionApartmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const close = () => navigate(-1);

  const handleAction = (action) => {
    if (action == 1) {
      //// редактирование глfвных данных
      navigate('/every/apartment_crud', { state: { ...location.state, nav: 2 } });
    }
    if (action == 2) {
      //// удаление квартиры
      navigate('/every/apartment_crud', { state: { ...location.state, action_type: 3, nav: 2 } });
    }

    if (action == 3) {
      //// crud список правил
      navigate('/every/rules_action', { state: location.state });
    }

    if (action == 4) {
      //// crud список удобств
      navigate('/every/conveniences_action', { state: location.state });
    }

    if (action == 5) {
      //// редактирование координат
      navigate('/every/map_action', { state: { ...location.state, nav: 2 } });
    }

    if (action == 6) {
      //// редактирование цен
      navigate('/every/view_apartment_price', { state: location.state });
    }

    if (action == 7) {
      //// редактирование и отображение фото квартиры
      navigate('/every/crud_apartment_photo', { state: location.state });
    }

    if (action == 8) {
      //// редактирование и отображение видео квартиры
      navigate('/every/view_apartment_video', { state: location.state });
    }

    if (action == 9) {
      //// редактирование и отображение видео квартиры
      navigate('/every/view_apartment_lock', { state: location.state });
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={close}
      aria-labelledby="dialog-title"
      className="menuActionApartment"
      PaperProps={{
        sx: {
          borderRadius: 3,
          minWidth: 360,
          paddingX: 1,
          paddingY: 1
        }
      }}
    >
      <div className="modalActionApartment">
        <div className="header">
          <DialogTitle id="dialog-title">Выберите действие</DialogTitle>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>

        <Divider sx={{ mb: 1 }} />

        <Paper elevation={0}>
          <List disablePadding>
            <ListItemButton onClick={() => handleAction(1)}>
              <ListItemIcon>
                <EditIcon width="18" height="18" title={''} />
              </ListItemIcon>
              <ListItemText primary="Информация о квартире" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(2)}>
              <ListItemIcon>
                <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" title={''} />
              </ListItemIcon>
              <ListItemText primary="Удалить квартиру" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(3)}>
              <ListItemIcon>
                <img className="listIcon" src={imgList} alt="*" width={16} height={16} />
              </ListItemIcon>
              <ListItemText primary="Правила квартиры" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(4)}>
              <ListItemIcon>
                <img className="listIcon" src={imgListConv} alt="*" width={16} height={16} />
              </ListItemIcon>
              <ListItemText primary="Удобства квартиры" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(5)}>
              <ListItemIcon>
                <MapIcon width="18" height="18" title={''} />
              </ListItemIcon>
              <ListItemText primary="Посмотреть на карте" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(6)}>
              <ListItemIcon>
                <img className="payIcon" src={imgPay} alt="*" width={16} height={16} />
              </ListItemIcon>
              <ListItemText primary="Прайс квартиры" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(7)}>
              <ListItemIcon>
                <img className="payIcon" src={imgGalery} alt="*" width={19} height={19} />
              </ListItemIcon>
              <ListItemText primary="Фотографии квартиры" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(8)}>
              <ListItemIcon>
                <img className="videoIcon" src={imgVideo} alt="*" width={19} height={19} />
              </ListItemIcon>
              <ListItemText primary="Видео квартиры" />
            </ListItemButton>

            <ListItemButton onClick={() => handleAction(9)}>
              <ListItemIcon>
                <img className="videoIcon" src={imgDoor} alt="*" width={19} height={19} />
              </ListItemIcon>
              <ListItemText primary="Данные замка" />
            </ListItemButton>
          </List>
        </Paper>
      </div>
    </Dialog>
  );
};

export default MenuActionApartmentPage;
