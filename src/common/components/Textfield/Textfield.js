/* eslint-disable react/prop-types */
import React from 'react';
import { StyledWrapper, StyledInput, StyledErrorMessage, StyledLabel } from './styles';

const TextField = ({ errors, label, name, placeholder, register, type, defaultValue }) => (
  <StyledWrapper>
    {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
    <StyledInput
      defaultValue={defaultValue}
      autoComplete="off"
      type={type}
      name={name}
      placeholder={placeholder}
      ref={register}
    />
    {errors && errors[name] && errors[name].message && (
      <StyledErrorMessage>{errors[name].message}</StyledErrorMessage>
    )}
  </StyledWrapper>
);

export default TextField;
