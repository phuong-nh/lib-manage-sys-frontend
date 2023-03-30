import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getContent } from '../../api'
import { Content } from '../../types'

const initialState: Content[] = getContent()

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<Content[]>) => {
      return action.payload
    },
    addContent: (state, action: PayloadAction<Content>) => {
      return [action.payload, ...state]
    },
    updateContent: (state, action: PayloadAction<Content>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removeContent: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }
  }
})

export const { setContent, addContent, updateContent, removeContent } = contentSlice.actions

export default contentSlice.reducer
