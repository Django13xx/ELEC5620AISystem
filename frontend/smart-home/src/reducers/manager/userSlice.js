// src/reducers/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    token: null,
    name: '',
    email: ''
  },
  isAuthenticated: false,  // 认证状态
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 登录成功，设置 token 并更新认证状态
    loginSuccess: (state, action) => {
      state.user.token = action.payload.token;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.isAuthenticated = true;
    },
    // 登出，清空用户信息和认证状态
    logout: (state) => {
      state.user.token = null;
      state.user.name = '';
      state.user.email = '';
      state.isAuthenticated = false;
    }
  }
});

// 导出 actions
export const { loginSuccess, logout } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;
