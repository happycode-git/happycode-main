import { createSlice } from '@reduxjs/toolkit'

export const prospectsSlice = createSlice({
  name: 'prospects',
  initialState: {
    value: [],
  },
  reducers: {
    setProspectsState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProspectsState } = prospectsSlice.actions

export default prospectsSlice.reducer