import { configureStore } from '@reduxjs/toolkit'
import displayTextOptionsReducer from './displayTextOptionsSlice'
import displayTextReducer from './displayTextSlice'
import fontsReducer from './fontsSlice'

export default configureStore({
  reducer: {
    displayText: displayTextReducer,
    displayTextOptions: displayTextOptionsReducer,
    fonts: fontsReducer
  }
})
