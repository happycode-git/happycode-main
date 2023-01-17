import { createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    value: {},
  },
  reducers: {
    setProjectState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProjectState } = projectSlice.actions

export default projectSlice.reducer