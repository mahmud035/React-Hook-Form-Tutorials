import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

const YouTubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    },
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

  // console.log({ touchedFields, dirtyFields, isDirty, isValid });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });
  console.log('errors:', errors);

  // const watchShowAge = watch('age');
  // const allFields = watch();
  // const [uname, email] = watch(['username', 'email']);
  // console.log('watch:',uname, email);

  const handleRegister = (data) => {
    console.log(data);

    const username = data.username;
    const email = data.email;
    const channel = data.channel;
    // console.log(username, email, channel);
  };

  const onError = (errors) => {
    // console.log('Form errors', errors);
  };

  const handleGetValues = () => {
    const values = getValues();
    console.log('getValues:', values);
  };

  const handleSetValue = () => {
    setValue('username', 'mahmud', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  /*  This `useEffect` hook is resetting the form when the form is successfully submitted. It listens to
   the `isSubmitSuccessful` variable and when it changes, it calls the `reset()` function which resets
   the form to its default values. */

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful]);

  renderCount++;
  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(handleRegister, onError)} noValidate>
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

          {errors?.username && (
            <span className="error">{errors?.username?.message}</span>
          )}
        </div>
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
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  console.log('Email Exist?', data);
                  return data.length === 0 || 'Email already exist';
                },
              },
            })}
            type="email"
            id="email"
            name="email"
          />

          {errors?.email && (
            <span className="error">{errors?.email?.message}</span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            {...register('channel', {
              disabled: watch('username') === '', // conditionally disabled input field
              required: {
                value: true,
                message: 'Channel name is required',
              },
            })}
            type="text"
            id="channel"
            name="channel"
          />

          {errors.channel && (
            <span className="error">{errors?.channel?.message}</span>
          )}
        </div>
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

          {errors.age && <span className="error">{errors?.age?.message}</span>}
        </div>
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

          {errors?.social?.twitter && (
            <span className="error">{errors?.social?.twitter?.message}</span>
          )}
        </div>
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

          {errors?.social?.facebook && (
            <span className="error">{errors?.social?.facebook?.message}</span>
          )}
        </div>
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

          {errors?.phoneNumbers && (
            <span className="error">{errors?.phoneNumbers[0]?.message}</span>
          )}
        </div>
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
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>{' '}
        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>{' '}
        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};

export default YouTubeForm;
