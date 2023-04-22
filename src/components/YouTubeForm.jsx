import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

const YouTubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //* INFO: set previously saved data as a defaultValues
    // defaultValues: async () => {
    //   const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    //   const data = await res.json();
    //   // console.log(data);
    //   return {
    //     username: '',
    //     email: data.email,
    //     channel: '',
    //   };
    // },

    defaultValues: {
      username: '',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
      age: 0,
      dob: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  console.log('errors:', errors);

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
        <div className="form-control">
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
        </div>

        {errors?.username && (
          <span className="error">{errors?.username?.message}</span>
        )}

        <div className="form-control">
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
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@example.com' ||
                    'Enter a different email address'
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('baddomain.com') ||
                    'This domain is not supported'
                  );
                },
              },
            })}
            type="email"
            id="email"
            name="email"
          />
        </div>

        {errors?.email && (
          <span className="error">{errors?.email?.message}</span>
        )}

        <div className="form-control">
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
        </div>

        {errors.channel && (
          <span className="error">{errors?.channel?.message}</span>
        )}

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            {...register('age', {
              required: {
                value: true,
                message: 'Age name is required',
              },
              valueAsNumber: true,
            })}
            type="number"
            id="age"
          />
        </div>

        {errors.age && <span className="error">{errors?.age?.message}</span>}

        <div className="form-control">
          <label htmlFor="age">Date Of Birth</label>
          <input
            {...register('dob', {
              required: {
                value: true,
                message: 'Date of birth is required',
              },
              valueAsDate: true,
            })}
            type="date"
            id="dob"
          />

          {errors.dob && <span className="error">{errors?.dob?.message}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            {...register('social.twitter', {
              required: {
                value: true,
                message: 'Twitter account link is required',
              },
            })}
            type="text"
            id="twitter"
          />
        </div>

        {errors?.social?.twitter && (
          <span className="error">{errors?.social?.twitter?.message}</span>
        )}

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            {...register('social.facebook', {
              required: {
                value: true,
                message: 'Facebook account link is required',
              },
            })}
            type="text"
            id="facebook"
          />
        </div>

        {errors?.social?.facebook && (
          <span className="error">{errors?.social?.facebook?.message}</span>
        )}

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            {...register('phoneNumbers[0]', {
              required: {
                value: true,
                message: 'Primary Phone Number is required',
              },
            })}
            type="text"
            id="primary-phone"
          />
        </div>

        {errors?.phoneNumbers && (
          <span className="error">{errors?.phoneNumbers[0]?.message}</span>
        )}

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            {...register('phoneNumbers[1]')}
            type="text"
            id="secondary-phone"
          />
        </div>

        {/* lec: 15 => Dynamic Fields START */}
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number`)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}

            <button type="button" onClick={() => append({ number: '' })}>
              Add Phone Number
            </button>
          </div>
        </div>
        {/* lec: 15 => Dynamic Fields END */}

        <button>Submit</button>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};

export default YouTubeForm;
