import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem 0.75rem;
  width: ${(props) => (props.isFullWidth ? '100%' : 'auto')};
  background-color: transparent;
  color: ${props => props.disabled ? '#bfbfbf' : '#151515'};
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.75rem;
  outline: none;
  border-radius: 0.25rem;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};

  &:hover {
    -webkit-transition: background-color 0.2s ease;
    -ms-transition: background-color 0.2s ease;
    transition: background-color 0.2s ease;
  }
`;

export const StyledPrimaryButton = styled(StyledButton)`
  border: none;
  background-color: ${props => props.disabled ? '#9acaff' : '#276fbf'};
  color: white;

  &:hover,
  &:focus {
    background-color: ${props => props.disabled ? null : '#1f5694'};
  }
`;

export const StyledSecondaryButton = styled(StyledButton)`
  border: 1px solid #e2e2e2;
  background-color: #ffffff;

  &:hover,
  &:focus {
    background-color: ${props => props.disabled ? null : '#f2f2f2'};
  }
`;