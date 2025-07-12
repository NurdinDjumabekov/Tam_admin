import { Link, NavLink } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import config from 'config';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

///// icons
import logo from '../../../assets/images/logoWhite.png';

////// style
import './style.scss';

const LogoSection = () => {
  const theme = useTheme();

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <NavLink to={config.defaultPath} className={matchUpMd ? 'logoMain' : 'logoMain logoMainMobile'}>
      <div className="logoIcon">
        <div className={'logoMain'}>
          <img src={logo} alt="logo" className="logoIcon" />
        </div>
        <div className="logoIcon__text">
          <p>TAM.KG</p>
        </div>
      </div>
    </NavLink>
  );
};

export default LogoSection;
