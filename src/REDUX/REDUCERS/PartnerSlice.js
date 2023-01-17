import { createSlice } from '@reduxjs/toolkit'

export const partnerSlice = createSlice({
    name: 'partner',
    initialState: {
        value: {},
    },
    reducers: {
        setPartnerState: (state, action) => {
            state.value = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPartnerState } = partnerSlice.actions

export default partnerSlice.reducer