import React from 'react';
import PropTypes from 'prop-types';
import { StyledWrapper, StyledInput, StyledErrorMessage, StyledLabel } from './styles';

export const TYPE_TEXTFIELD = {
  email: 'email',
  password: 'password',
  text: 'text',
};

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

TextField.propTypes = {
  errors: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  type: PropTypes.oneOf([TYPE_TEXTFIELD.email, TYPE_TEXTFIELD.text, TYPE_TEXTFIELD.password]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextField.defaultProps = {
  errors: null,
  label: null,
  placeholder: null,
  register: null,
  type: TYPE_TEXTFIELD.text,
  defaultValue: null,
};

export default TextField;
