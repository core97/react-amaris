import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { StyledPrimaryButton, StyledSecondaryButton } from './styles';

export const TYPE_BUTTON = {
  button: 'button',
  submit: 'submit',
};

const Button = ({ onClick, type, secondary, isFullWidth, isLoading, disabled, children }) => {
  if (secondary) {
    return (
      <StyledSecondaryButton
        onClick={onClick}
        type={type}
        isFullWidth={isFullWidth}
        disabled={disabled}
        secondary={secondary}
      >
        {isLoading ? <Loader type="TailSpin" color="#276fbf" height={20} width={20} /> : children}
      </StyledSecondaryButton>
    );
  }

  return (
    <StyledPrimaryButton
      onClick={onClick}
      type={type}
      isFullWidth={isFullWidth}
      disabled={disabled}
    >
      {isLoading ? <Loader type="TailSpin" color="#ffffff" height={20} width={20} /> : children}
    </StyledPrimaryButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf([TYPE_BUTTON.button, TYPE_BUTTON.submit]).isRequired,
  secondary: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  onClick: null,
  secondary: false,
  isFullWidth: false,
  isLoading: false,

  disabled: false,
};

export default Button;
