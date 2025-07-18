import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

////// icons

const BtnCancel = (props) => {
  const { text, click } = props;

  return (
    <div className="btnCancels">
      <div onClick={click}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default BtnCancel;
