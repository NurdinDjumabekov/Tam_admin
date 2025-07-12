import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

import MenuList from './MenuList';
import LogoSection from '../LogoSection';

import { drawerWidth } from 'store/constant';

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={matchUpMd ? undefined : drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            color: theme.palette.text.primary,
            top: matchUpMd ? '69px' : '0px',
            background: 'rgba(0, 0, 0, 0.907)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)'
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
            <LogoSection />
          </Box>
        </Box>

        <BrowserView>
          <PerfectScrollbar
            component="div"
            style={{
              height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 72px)',
              paddingLeft: '16px',
              paddingRight: '16px'
              // background: '#000000e9'
            }}
          >
            <MenuList drawerToggle={matchUpMd ? () => {} : drawerToggle} />
          </PerfectScrollbar>
        </BrowserView>

        <MobileView>
          <Box sx={{ px: 2 }}>
            <MenuList drawerToggle={matchUpMd ? () => {} : drawerToggle} />
          </Box>
        </MobileView>
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
