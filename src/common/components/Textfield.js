/* eslint-disable react/prop-types */
import React from 'react';

const TextField = ({ errors, label, name, placeholder, register, type, defaultValue }) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      defaultValue={defaultValue}
      autoComplete="off"
      type={type}
      name={name}
      placeholder={placeholder}
      ref={register}
    />
    {errors && errors[name] && errors[name].message && <span>{errors[name].message}</span>}
  </div>
);

export default TextField;
