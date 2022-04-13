import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'fonts',
  initialState: localStorage.getItem('fonts') ?? {},
  reducers: {
    // updateDisplayText: (state, action) => {
    //   let displayText = action.payload
    //   localStorage.setItem('displayText', displayText)
    //   return displayText
    // }
  }
})

// export const { updateDisplayText } = slice.actions
export default slice.reducer
