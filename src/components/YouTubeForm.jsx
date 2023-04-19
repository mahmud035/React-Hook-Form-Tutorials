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
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};

export default YouTubeForm;
