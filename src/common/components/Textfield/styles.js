import styled from 'styled-components';

export const StyledWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label`
  font-weight: lighter;
  margin-bottom: 0.5rem;
`;

export const StyledInput = styled.input`
  padding: .75rem;
  outline: none;
  border-radius: 0.25rem;
  border: 1px solid ${(props) => (props.error ? 'red' : '#d8d8d8')};
  font-size: 1rem;

  &:focus {
    border: 1px solid black;
  }
`;

export const StyledErrorMessage = styled.span`
  color: red;
`;