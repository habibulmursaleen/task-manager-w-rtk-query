import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeProjects: [],
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFilters } = filterSlice.actions;
export default filterSlice.reducer;
