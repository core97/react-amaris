import styled from 'styled-components';

export const StyledCardWrapper = styled.div`
  position: relative;
  height: 275px;
  margin: 0.75rem 0;
  min-width: 15rem;
  max-width: 18rem;
  border-radius: 0.25rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &:hover, &:focus {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    -webkit-transition: box-shadow 0.2s ease;
    -ms-transition: box-shadow 0.2s ease;
    transition: box-shadow 0.2s ease;
  }
`;

export const StyledBackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'red')};
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

export const StyledInfoWrapper = styled.div`
  text-align: center;
  padding: 0 0.75rem;
  padding-bottom: 0.75rem;
  padding-top: 0.5rem;
`;

export const StyledTitle = styled.h3`
  color: black;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
`;

export const StyledSubtitle = styled.h3`
  margin-top: 0.5rem;
  font-weight: lighter;
  color: rgba(31, 41, 55, 0.8);
`;