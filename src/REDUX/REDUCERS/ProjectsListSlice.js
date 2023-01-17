import { createSlice } from '@reduxjs/toolkit'

export const projectsListSlice = createSlice({
  name: 'projects',
  initialState: {
    value: [],
  },
  reducers: {
    setProjectsListState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProjectsListState } = projectsListSlice.actions

export default projectsListSlice.reducer