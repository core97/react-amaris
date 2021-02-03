/* eslint-disable react/prop-types */
import React from 'react';
import { StyledPrimaryButton, StyledSecondaryButton} from './styles';

export const TYPE_BUTTON = {
  button: 'button',
  submit: 'submit',
};

const Button = ({ onClick, type, secondary, isFullWidth, disabled, children }) => {
  if (secondary) {
    return (
      <StyledSecondaryButton
        onClick={onClick}
        type={type}
        isFullWidth={isFullWidth}
        disabled={disabled}
        secondary={secondary}
      >
        {children}
      </StyledSecondaryButton>
    );
  }

  return (
    <StyledPrimaryButton onClick={onClick} type={type} isFullWidth={isFullWidth} disabled={disabled}>
      {children}
    </StyledPrimaryButton>
  );
};

export default Button;
