import { createSlice } from '@reduxjs/toolkit'
import getFontTag from '../utils/getFontTag'
import availableTags from './availableTags'

const LOCALSTORAGEPROPNAME = 'fonts'

const fontsDefault = ['Nanum Brush Script']

export const slice = createSlice({
  name: 'fonts',
  initialState: localStorage.getItem(LOCALSTORAGEPROPNAME)
    ? JSON.parse(localStorage.getItem(LOCALSTORAGEPROPNAME))
    : fontsDefault,
  reducers: {
    addFont: (state, action) => {
      const newFontName = action.payload

      if (state.indexOf(newFontName) === -1) state.push(newFontName)

      slice.caseReducers.saveFonts(state)
    },

    removeFont: (state, action) => {
      const removedFontName = action.payload

      const newState = state.filter(fontName => fontName !== removedFontName)

      slice.caseReducers.saveFonts(newState)
      return newState
    },

    importFonts: (state, action) => {
      const importedRecord = JSON.parse(action.payload)

      const newState = []

      Object.entries(importedRecord).forEach(([fontName, tag]) => {
        if (tag !== availableTags.slice(-1)[0])
          localStorage.setItem(fontName, tag)
        newState.push(fontName)
      })

      slice.caseReducers.saveFonts(newState)
      return newState
    },

    resetFonts: (state, action) => {
      localStorage.clear()
      slice.caseReducers.saveFonts(fontsDefault)
      return fontsDefault.slice()
    },

    reloadFonts: (state, action) => {
      // sort fonts
      const newState = state.sort((fontName1, fontName2) => {
        const TagIdx1 = availableTags.indexOf(getFontTag(fontName1))
        const TagIdx2 = availableTags.indexOf(getFontTag(fontName2))

        if (TagIdx1 !== TagIdx2) return TagIdx1 - TagIdx2

        return fontName1.localeCompare(fontName2)
      })

      slice.caseReducers.saveFonts(newState)
      return newState
    },

    saveFonts: (state, action) => {
      localStorage.setItem(LOCALSTORAGEPROPNAME, JSON.stringify(state))
    }
  }
})

export const {
  addFont,
  removeFont,
  importFonts,
  resetFonts,
  reloadFonts
} = slice.actions
export default slice.reducer
