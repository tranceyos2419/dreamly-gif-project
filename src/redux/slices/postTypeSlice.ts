import { EPostType } from './../../@types/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from './../type.d';

export const postTypeSlice = createSlice({
  name: 'postType',
  initialState: {
    type: EPostType.All
  },
  reducers: {
    changePostType: (state, { payload }: PayloadAction<{ type: EPostType }>) => {
      state.type = payload.type;
    }
  }
})


export const selectPostType = (state: State) => state.postType;

export const { changePostType } = postTypeSlice.actions;

export default postTypeSlice.reducer;
