import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

const YouTubeForm = () => {
  const {
    register,
    control,
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

  renderCount++;
  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required',
            },
          })}
          type="text"
          id="username"
          name="username"
        />

        {errors?.username && <span>{errors.username.message}</span>}

        <label htmlFor="email">E-mail</label>
        <input
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email format',
            },
          })}
          type="email"
          id="email"
          name="email"
        />

        {errors?.email && <span>{errors.email.message}</span>}

        <label htmlFor="channel">Channel</label>
        <input
          {...register('channel', {
            required: {
              value: true,
              message: 'Channel name is required',
            },
          })}
          type="text"
          id="channel"
          name="channel"
        />

        {errors.channel && <span>{errors.channel.message}</span>}

        <button>Submit</button>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};

export default YouTubeForm;
