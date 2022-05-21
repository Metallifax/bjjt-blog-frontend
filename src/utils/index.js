import { useEffect, useState } from 'react';

import { setUser } from '../features/user/userSlice';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const setGlobalUserData = (user, dispatch) => {
  const { _id, email, displayName, blogPosts } = user;

  dispatch(
    setUser({
      id: _id,
      email,
      displayName:
        displayName === '' || displayName === undefined
          ? email.slice(0, email.indexOf('@'))
          : displayName,
      blogPosts,
    }),
  );
};
