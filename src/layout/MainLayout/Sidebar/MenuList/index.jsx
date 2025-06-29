// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../menu_pages';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = ({ drawerToggle }) => {
  return (
    <div onClick={drawerToggle}>
      {menuItem?.items?.map((item) => {
        switch (item.type) {
          case 'group':
            return <NavGroup key={item.id} item={item} />;
          default:
            return (
              <Typography key={item.id} variant="h6" color="error" align="center">
                Menu Items Error
              </Typography>
            );
        }
      })}
    </div>
  );
};

export default MenuList;
