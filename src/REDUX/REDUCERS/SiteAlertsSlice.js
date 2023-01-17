import { createSlice } from '@reduxjs/toolkit'

export const siteAlertSlice = createSlice({
  name: 'siteAlert',
  initialState: {
    value: "Testing, testing, 123",
  },
  reducers: {
    setSiteAlertState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSiteAlertState } = siteAlertSlice.actions

export default siteAlertSlice.reducer