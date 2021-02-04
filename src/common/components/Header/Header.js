import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_STATES } from 'constants/authorization';
import {
  StyledHeader,
  StyledNavbar,
  StyledItemsLeft,
  StyledItemsRight,
  StyledNavbarItem,
} from './styles';

const Header = () => {
  const { userState } = useSelector((state) => state.authorization);

  return (
    <StyledHeader>
      <StyledNavbar>
        <StyledItemsLeft>
          <StyledNavbarItem>
            <Link to="/">Lista de usuarios</Link>
          </StyledNavbarItem>
        </StyledItemsLeft>
        <StyledItemsRight>
          {userState === USER_STATES.LOGGED && (
            <StyledNavbarItem>
              <Link to="/login">Cerrar sesión</Link>
            </StyledNavbarItem>
          )}
        </StyledItemsRight>
      </StyledNavbar>
    </StyledHeader>
  );
};

export default Header;
