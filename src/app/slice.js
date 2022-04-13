import { createSlice } from '@reduxjs/toolkit'

export const displayTextSlice = createSlice({
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

export const { updateDisplayText } = displayTextSlice.actions
export default displayTextSlice.reducer
