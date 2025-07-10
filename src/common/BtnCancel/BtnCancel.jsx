import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

////// icons

const BtnCancel = (props) => {
  const { text, click } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="btnCancel">
      <button onClick={click} className="createUser">
        <p>{text}</p>
      </button>
    </div>
  );
};

export default BtnCancel;
