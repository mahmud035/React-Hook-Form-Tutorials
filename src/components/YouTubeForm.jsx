import React from 'react';
import { useForm } from 'react-hook-form';

const YouTubeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const handleRegister = (data) => {
    console.log(data);

    const username = data.username;
    const email = data.email;
    const channel = data.channel;
    // console.log(username, email, channel);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(handleRegister)}>
        <label htmlFor="username">Username</label>
        <input
          {...register('username', { required: true })}
          type="text"
          id="username"
          name="username"
        />

        {errors?.username && <span>This field is required</span>}

        <label htmlFor="email">E-mail</label>
        <input
          {...register('email', { required: true })}
          type="email"
          id="email"
          name="email"
        />

        {errors?.email && <span>This field is required</span>}

        <label htmlFor="channel">Channel</label>
        <input
          {...register('channel', { required: true })}
          type="text"
          id="channel"
          name="channel"
        />

        {errors.channel && <span>This field is required</span>}

        <button>Submit</button>
      </form>
    </div>
  );
};

export default YouTubeForm;
