import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  id: '',
  email: '',
  displayName: '',
  blogPosts: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: initialUserState,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = initialUserState;
    },
  },
});

export const { setIsLoggedIn, setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
