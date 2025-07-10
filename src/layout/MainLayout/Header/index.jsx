import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLandLordReq, searchUserFN } from 'store/reducers/usersSlice';

// styles
import './style.scss';
import { getListApartmentsReq, searchApartmentFn } from 'store/reducers/apartmentsSlice';

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  ////////////// users
  const { searchUser, typeUsers } = useSelector((state) => state.usersSlice);
  const onChangeUser = (value) => {
    dispatch(searchUserFN(value));

    if (value?.length == 0) {
      const obj = { typeUsers, searchUser: '' };
      dispatch(getAllLandLordReq(obj));
    }
  };
  const searchUsersFN = () => {
    const obj = { typeUsers, searchUser };
    dispatch(getAllLandLordReq(obj));
  };

  ////////////// квартиры
  const { searchApartment } = useSelector((state) => state.apartmentsSlice);
  const onChangeApartment = (value) => {
    dispatch(searchApartmentFn(value));
    if (value?.length == 0) {
      dispatch(getListApartmentsReq({ searchApartment: '' }));
    }
  };
  const searchApartmentsFN = () => {
    dispatch(getListApartmentsReq({ searchApartment }));
  };

  return (
    <>
      <Box
        sx={{
          width: 240,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleLeftDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <IconMenu2 />
        </IconButton>
      </Box>

      {/* header search */}
      {/* //// для поиска пользователей и арендодателей */}
      {location?.pathname == '/order/choice_user' && (
        <div className="searchUserForCreateOrder">
          <SearchSection value={searchUser} setValue={onChangeUser} onClick={searchUsersFN} placeholder="Поиск по номеру телефона" />
        </div>
      )}

      {/* //// для поиска квартиры по номеру */}
      {location?.pathname == '/order/choice_apartment' && (
        <div className="searchUserForCreateOrder">
          <SearchSection
            value={searchApartment}
            setValue={onChangeApartment}
            onClick={searchApartmentsFN}
            placeholder="Поиск по номеру квартиры"
          />
        </div>
      )}
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
