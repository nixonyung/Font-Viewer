import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'displayTextOptions',
  initialState: { styles: [] },
  reducers: {
    updateStyles: (state, action) => {
      const newStyles = action.payload

      state.styles = newStyles
    }
  }
})

export const { updateStyles } = slice.actions
export default slice.reducer
