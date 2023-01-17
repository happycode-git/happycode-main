import { createSlice } from '@reduxjs/toolkit'

export const toggleSiteAlertSlice = createSlice({
  name: 'toggleSiteAlert',
  initialState: {
    value: false,
  },
  reducers: {
    setToggleSiteAlertState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToggleSiteAlertState } = toggleSiteAlertSlice.actions

export default toggleSiteAlertSlice.reducer