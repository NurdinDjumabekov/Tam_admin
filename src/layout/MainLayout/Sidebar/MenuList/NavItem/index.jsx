import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import config from 'config';

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: item?.url == pathname ? 8 : 6,
        height: item?.url == pathname ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) itemTarget = '_blank';

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };

  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={item?.url === pathname}
      onClick={() => navigate(`${item?.url}`)}
      sx={{
        borderRadius: `${config.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
        '&.Mui-selected': {
          backgroundColor: '#5d5d5d6b !important',
          color: '#ffffff'
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#5d5d5d6b !important'
        },
        '&:hover': {
          backgroundColor: '#1a1a1a'
        }
      }}
    >
      <ListItemIcon
        sx={{
          my: 'auto',
          minWidth: !item?.icon ? 18 : 36,
          color: item?.url === pathname ? '#2172ef !important' : '#939393',
          '.MuiListItemButton-root:hover &': {
            color: item?.url === pathname ? '#2172ef !important' : '#939393'
          }
        }}
      >
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={item?.url == pathname ? 'h5' : 'body1'} color={item?.url === pathname ? '#2172ef' : '#939393'} fontSize={12}>
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
