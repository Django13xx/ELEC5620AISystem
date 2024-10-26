import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    userId: null,  
    role: null,    
    token: null,
    name: '',
    email: '',
  },
  isAuthenticated: false,  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 登录成功，设置 userId, role, token 并更新认证状态
    loginSuccess: (state, action) => {
      state.user.userId = action.payload.userId;   // 新增 userId
      state.user.role = action.payload.role;       // 新增 role
      state.user.token = action.payload.token;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.isAuthenticated = true;                // 登录成功后认证状态为 true
    },
    // 登出，清空用户信息和认证状态
    logout: (state) => {
      state.user.userId = null;
      state.user.role = null;
      state.user.token = null;
      state.user.name = '';
      state.user.email = '';
      state.isAuthenticated = false;               // 登出后认证状态为 false
    },
  },
});

// 导出 actions
export const { loginSuccess, logout } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;
