import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

////// icons

const BtnSave = (props) => {
  const { text, click } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="btnSaves">
      <button onClick={click}>
        <p>{text}</p>
      </button>
    </div>
  );
};

export default BtnSave;
