import { createSlice } from '@reduxjs/toolkit'

const fontsDefault = {
  fonts: [
    {
      name: 'Nanum Brush Script',
      tags: ['haha', 'hehe']
    }
  ]
}

export const slice = createSlice({
  name: 'fonts',
  initialState: localStorage.getItem('fonts')
    ? JSON.parse(localStorage.getItem('fonts'))
    : fontsDefault,
  reducers: {
    addFont: (state, action) => {
      state.fonts.push({ name: action.payload, tags: [] })
      saveFonts(state)
    },
    removeFont: (state, action) => {
      const idx = state.fonts.findIndex(font => font.name === action.payload)
      if (idx !== -1) {
        state.fonts.splice(idx, 1)
      }
      saveFonts(state)
    }
  }
})

function saveFonts (state) {
  localStorage.setItem('fonts', JSON.stringify(state))
}

export const { addFont, removeFont } = slice.actions
export default slice.reducer
