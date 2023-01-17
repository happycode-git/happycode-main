import { createSlice } from '@reduxjs/toolkit'

export const adminUserSlice = createSlice({
  name: 'admin',
  initialState: {
    value: {},
  },
  reducers: {
    setAdminUserState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAdminUserState } = adminUserSlice.actions

export default adminUserSlice.reducer