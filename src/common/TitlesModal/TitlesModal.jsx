import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

////// icons
import CloseIcon from '@mui/icons-material/Close';

const TitlesModal = (props) => {
  const { title } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const preFN = () => navigate(-1);

  return (
    <div className="titlesModal">
      <h5>{title}</h5>
      <button onClick={preFN} className="prevBtn">
        <CloseIcon />
      </button>
    </div>
  );
};

export default TitlesModal;
