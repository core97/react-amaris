import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf([TYPE_BUTTON.button, TYPE_BUTTON.submit]).isRequired,
  secondary: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  onClick: null,
  secondary: false,
  isFullWidth: false,
  disabled: false,
};

export default Button;
