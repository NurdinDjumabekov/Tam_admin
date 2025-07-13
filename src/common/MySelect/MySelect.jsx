////////// hooks
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns

/////// icons

////// components
import Select from 'react-select';

///// enums

////// style
import './style.scss';

const MySelect = (props) => {
  const { value, onChangeWS, list, title } = props;

  return (
    <div className="myInputs mySelectDark">
      <h5>{title}</h5>
      <Select
        options={list}
        className="select"
        onChange={onChangeWS}
        value={value}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#2172ef' : state.isFocused ? '#2a2a2a' : 'transparent',
            color: state.isSelected ? '#fff' : '#e0e0e0',
            cursor: 'pointer'
          }),
          control: (base) => ({
            ...base,
            backgroundColor: '#111',
            borderColor: '#2172ef',
            color: '#fff',
            fontSize: '13px'
          }),
          singleValue: (base) => ({ ...base, color: '#fff' }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#333333',
            borderRadius: 8,
            overflow: 'hidden'
          })
        }}
      />
    </div>
  );
};
export default MySelect;
