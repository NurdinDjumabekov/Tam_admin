import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

////// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Titles = (props) => {
  const { title } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const preFN = () => navigate(-1);

  return (
    <div className="titlesAction">
      <button onClick={preFN} className="prevBtn">
        <ArrowBackIcon fontSize="13" />
      </button>
      <h5>{title}</h5>
    </div>
  );
};

export default Titles;
