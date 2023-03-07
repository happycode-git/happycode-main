import { createSlice } from '@reduxjs/toolkit'

export const buildsSlice = createSlice({
  name: 'builds',
  initialState: {
    value: [],
  },
  reducers: {
    setBuildsState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setBuildsState } = buildsSlice.actions

export default buildsSlice.reducer