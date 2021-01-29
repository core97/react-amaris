import React from 'react';
import { useParams } from "react-router-dom";

const DetailUser = () => {
  const { userID } = useParams();
  
  return (
    <h1>{`Hola desde la detalles de usuario: ${userID}`}</h1>
  );
};

export default DetailUser;