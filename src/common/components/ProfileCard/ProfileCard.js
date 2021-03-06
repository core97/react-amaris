import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledCardWrapper,
  StyledBackgroundImage,
  StyledAvatarWrapper,
  StyledAvatar,
  StyledInfoWrapper,
  StyledTitle,
  StyledSubtitle,
} from './styles';

const ProfileCard = ({ title, subtitle, img, bgColor }) => (
  <StyledCardWrapper>
    <StyledBackgroundImage bgColor={bgColor} />
    <StyledAvatarWrapper>
      <StyledAvatar src={img} width="128" height="128" alt="Photo profile" />
    </StyledAvatarWrapper>
    <StyledInfoWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledInfoWrapper>
  </StyledCardWrapper>
);

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default ProfileCard;
