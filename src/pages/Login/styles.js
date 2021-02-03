import styled from 'styled-components';

export const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.75rem;
  margin-bottom: 1.75rem;
`;

export const StyledTitle = styled.h3`
  margin-bottom: 1rem;
`;

export const StyledFormWrapper = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 0.25rem;
  display: inline-block;
  width: 100%;
  max-width: 40rem;
`;

export const StyledForm = styled.form`
  max-width: 50rem;
  padding: 0 1rem;
  margin: 2rem 0;

  @media (min-width: 768px) {
    padding: 0 2.25rem;
  }
`;

export const StyledButtonArea = styled.div`
  margin-top: 1.5rem;
`;
