import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileCard from 'common/components/ProfileCard/ProfileCard';
import Button, { TYPE_BUTTON } from 'common/components/Button/Button';
import { actionCreators as usersActions } from 'store/reducers/users';
import { StyledButtonArea, StyledContainer, StyledListItem, StyledListWrapper } from './styles';

const BUTTON_LABEL = {
  next: 'Siguiente',
  previous: 'Anterior',
};

const ListOfUsers = () => {
  const [usersPerPage, setUsersPerPage] = useState([]);
  const { data: usersList, totalPages, itemsPerPage, currentPage } = useSelector(
    (state) => state.users,
  );
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;
    const initialPage = 1;

    window.scrollTo(0, 0);
    switch (e.target.innerText) {
      case BUTTON_LABEL.previous:
        dispatch(usersActions.changeCurrentPage(previousPage));
        return;
      case BUTTON_LABEL.next:
        dispatch(usersActions.changeCurrentPage(nextPage));
        return;
      default:
        dispatch(usersActions.changeCurrentPage(initialPage));
    }
  };

  useEffect(() => {
    dispatch(usersActions.getUsers({ currentPage }));
  }, [currentPage]);

  useEffect(() => {
    /**
     * Paginacion para la lista de usuarios
     */
    setUsersPerPage(usersList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [usersList, currentPage]);

  return (
    <StyledContainer>
      <StyledListWrapper>
        {usersPerPage.map((eachUser) => (
          <StyledListItem key={eachUser.id}>
            <Link to={`/users/${eachUser.id}`}>
              <ProfileCard
                title={`${eachUser.first_name} ${eachUser.last_name}`}
                subtitle={eachUser.email}
                img={eachUser.avatar}
                bgColor="#276FBF"
              />
            </Link>
          </StyledListItem>
        ))}
      </StyledListWrapper>
      <StyledButtonArea>
        <Button
          secondary
          type={TYPE_BUTTON.button}
          onClick={handleClick}
          disabled={currentPage === 1}
        >
          {BUTTON_LABEL.previous}
        </Button>
        <Button
          secondary
          type={TYPE_BUTTON.button}
          onClick={handleClick}
          disabled={currentPage === totalPages}
        >
          {BUTTON_LABEL.next}
        </Button>
      </StyledButtonArea>
    </StyledContainer>
  );
};

export default ListOfUsers;
