import React from 'react';

////// style
import './style.scss';

const SendInput = (props) => {
  const { value, onChange, title, name, placeholder } = props;
  const { type, maxLength, typeInput, required } = props;

  return (
    <div className="inputSend">
      <p>{title}</p>
      {typeInput == 'textarea' ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} name={name} required={!!required} />
      ) : (
        <input
          type={type ? type : 'text'}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          maxLength={type == 'number' ? 12 : 100}
          required={!!required}
        />
      )}
    </div>
  );
};

export default SendInput;
