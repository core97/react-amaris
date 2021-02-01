import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators as usersActions } from 'store/reducers/users';

const BUTTON_LABEL = {
  next: 'Siguiente',
  previous: 'Anterior',
};

const ListOfUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: usersList, totalPages, itemsPerPage } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case BUTTON_LABEL.previous:
        setCurrentPage(currentPage - 1);
        return;
      case BUTTON_LABEL.next:
        setCurrentPage(currentPage + 1);
        return;
      default:
        setCurrentPage(1);
    }
  };

  useEffect(() => {
    dispatch(usersActions.setUsers({ currentPage }));
  }, [currentPage]);

  return (
    <section>
      <ul>
        {usersList
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((eachUser) => (
            <li key={eachUser.id}>
              <Link to={`/users/${eachUser.id}`}>
                <p>{eachUser.email}</p>
                <p>{eachUser.first_name}</p>
              </Link>
            </li>
          ))}
      </ul>
      <div style={{ display: 'flex' }}>
        <button type="button" onClick={handleClick} disabled={currentPage === 1}>
          {BUTTON_LABEL.previous}
        </button>
        <button type="button" onClick={handleClick} disabled={currentPage === totalPages}>
          {BUTTON_LABEL.next}
        </button>
      </div>
    </section>
  );
};

export default ListOfUsers;
