import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'displayText',
  initialState: localStorage.getItem('displayText') ?? 'helloworld',
  reducers: {
    updateDisplayText: (state, action) => {
      let displayText = action.payload
      localStorage.setItem('displayText', displayText)
      return displayText
    }
  }
})

export const { updateDisplayText } = slice.actions
export default slice.reducer
