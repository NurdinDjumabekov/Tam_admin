import { Link, NavLink } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import config from 'config';

///// icons
import logo from '../../../assets/images/logo_blue.png';

////// style
import './style.scss';

const LogoSection = () => {
  return (
    <NavLink to={config.defaultPath} className="logoMain">
      <div className="logoIcon">
        {/* <div className="logo">
          <img src={logo} alt="logo" className="logoIcon" />
        </div> */}
        <div className="logoIcon__text">
          <p>Tam.kg</p>
        </div>
      </div>
    </NavLink>
  );
};

export default LogoSection;
