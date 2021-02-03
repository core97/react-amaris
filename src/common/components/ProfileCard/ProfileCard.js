/* eslint-disable react/prop-types */
import React from 'react';
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

export default ProfileCard;
