import { createSlice } from '@reduxjs/toolkit'

const fontsDefault = {
  records: [
    {
      fontName: 'Nanum Brush Script',
      tags: ['stylish']
    }
  ]
}

export const slice = createSlice({
  name: 'fonts',
  // initialState: fontsDefault,
  initialState: localStorage.getItem('fonts')
    ? JSON.parse(localStorage.getItem('fonts'))
    : fontsDefault,
  reducers: {
    addFont: (state, action) => {
      const newFontName = action.payload

      if (state.records.some(({ fontName }) => fontName === newFontName)) return

      state.records.push({ fontName: newFontName, tags: [] })
      state.records.sort(({ fontName: a }, { fontName: b }) =>
        a.localeCompare(b)
      )

      saveRecords(state)
    },
    removeFont: (state, action) => {
      const badFontName = action.payload

      state.records = state.records.filter(
        ({ fontName }) => fontName !== badFontName
      )

      saveRecords(state)
    },
    addTag: (state, action) => {
      const { fontName: atFontName, tag } = action.payload

      const fontIdx = state.records.findIndex(
        ({ fontName }) => fontName === atFontName
      )

      if (fontIdx === -1) return
      if (state.records[fontIdx].tags.includes(tag)) return

      state.records[fontIdx].tags.push(tag)
      state.records[fontIdx].tags.sort((a, b) => a.localeCompare(b))

      saveRecords(state)
    },
    removeTag: (state, action) => {
      const { fontName: atFontName, tag: badTag } = action.payload

      const fontIdx = state.records.findIndex(
        ({ fontName }) => fontName === atFontName
      )

      if (fontIdx === -1) return

      state.records[fontIdx].tags = state.records[fontIdx].tags.filter(
        tag => tag !== badTag
      )

      saveRecords(state)
    },
    importRecords: (state, action) => {
      const obj = JSON.parse(action.payload)
      console.log(obj)

      if (obj.records === undefined) return
      if (!Array.isArray(obj.records)) return
      if (
        obj.records.some(
          ({ fontName, tags }) =>
            fontName === undefined || tags === undefined || !Array.isArray(tags)
        )
      )
        return

      state.records = obj.records
      saveRecords(state)
    }
  }
})

function saveRecords (state) {
  localStorage.setItem('fonts', JSON.stringify(state))
}

export const {
  addFont,
  removeFont,
  addTag,
  removeTag,
  importRecords
} = slice.actions
export default slice.reducer
