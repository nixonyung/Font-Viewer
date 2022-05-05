import { configureStore } from '@reduxjs/toolkit'
import demoFontIdxReducer from './demoFontIdxSlice'
import demoModalOpenedReducer from './demoModalOpenedSlice'
import displayTextOptionsReducer from './displayTextOptionsSlice'
import displayTextReducer from './displayTextSlice'
import fontsReducer from './fontsSlice'

export default configureStore({
  reducer: {
    displayText: displayTextReducer,
    displayTextOptions: displayTextOptionsReducer,
    fonts: fontsReducer,
    demoFontIdx: demoFontIdxReducer,
    demoModalOpened: demoModalOpenedReducer
  }
})
