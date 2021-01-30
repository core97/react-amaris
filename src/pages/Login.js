import React from 'react';
import { useForm } from 'react-hook-form';
import Textfield from 'common/components/Textfield';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textfield
          label="Email"
          type="email"
          placeholder="Dirección de correo electrónico"
          name="email"
          errors={errors}
          register={register({
            required: { value: true, message: 'Es necesario el email' },
          })}
        />
        <Textfield
          label="Contraseña"
          type="password"
          placeholder="Contraseña de tu cuenta"
          name="password"
          errors={errors}
          register={register({
            required: { value: true, message: 'Es necesario la contraseña' },
          })}
        />
        <button type="submit">Accceder</button>
      </form>
    </section>
  );
};

export default Login;
