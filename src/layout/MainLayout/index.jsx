import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { CssBaseline, styled, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import { drawerWidth } from 'store/constant';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import Preloader from 'common/Preloader/Preloader';
import { useEffect, useState } from 'react';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '1px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '1px',
    marginRight: '1px'
  }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ view_left_menu = true, no_auth = false }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(matchUpMd);
  const location = useLocation();

  useEffect(() => {
    setDrawerOpen(matchUpMd);
  }, [matchUpMd]);

  const handleLeftDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const listMenu = location?.pathname.includes('list/');
  const crudCheck =
    location?.pathname.includes('/crud_') ||
    location?.pathname.includes('/create_order_users') ||
    location?.pathname.includes('/create_order_landlords');

  if (no_auth == true) {
    return (
      <div className="lendingPages">
        <Outlet />
        <Preloader view_left_menu={view_left_menu} />
      </div>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: false ? theme.transitions.create('width') : 'none'
        }}
      >
        <div className={`standartLayout ${crudCheck ? 'noneMenu' : ''} ${listMenu ? '' : 'menuMain'}`}>
          <Toolbar>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          </Toolbar>
        </div>
      </AppBar>

      {/* меню слева*/}
      {!!view_left_menu && <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} />}

      {/* main content */}
      <Main
        theme={theme}
        open={drawerOpen}
        className={crudCheck ? 'noneDataForModal' : ''}
        sx={{
          marginRight: view_left_menu ? 1 : 0,
          marginTop: 0,
          paddingTop: 11,
          minHeight: '100vh',
          height: '100vh',
          '@media screen and (max-width: 900px)': {
            paddingTop: 9,
            marginLeft: 0
          }
        }}
      >
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} icon title rightAlign />
        <Outlet />
      </Main>
      <Customization />
      <Preloader view_left_menu={view_left_menu} />
    </Box>
  );
};

export default MainLayout;
