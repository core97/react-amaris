import styled from 'styled-components';

export const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.75rem;
  margin-bottom: 1.75rem;
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

export const StyledAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
`;

export const StyledAvatar = styled.img`
  margin-top: 0.75rem;
  border-radius: 9999px;
  border: 2px solid white;
`;

export const StyledButtonArea = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;
