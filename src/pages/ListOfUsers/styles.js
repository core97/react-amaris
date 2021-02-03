import styled from 'styled-components';

export const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.75rem;

  @media (min-width: 640px) {
    padding: 0 1rem;
  }
`;

export const StyledListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: 1fr;
  width: 100%;
  padding: 0 0.5rem;

  @media (min-width: 640px) {
    max-width: 640px;
    padding: 0 1.75rem;
  }

  @media (min-width: 768px) {
    max-width: 768px;
    padding: 0 2.75rem;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
    padding: 0 3.25rem;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
    padding: 0 4rem;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
    padding: 0 6rem;
  }
`;

export const StyledListItem = styled.li`
  display: flex;
  justify-content: center;
`;

export const StyledButtonArea = styled.div`
  width: 90%;
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    width: 50%;
    grid-template-columns: repeat(2, 1fr);
  }
`;