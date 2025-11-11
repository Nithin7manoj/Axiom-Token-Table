import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TokenCategory = "All" | "New Pair" | "Final Stretch" | "Migrated";

interface TokenState {
  activeCategory: TokenCategory;
  sortBy: "name" | "price";
  sortDirection: "asc" | "desc";
}

const initialState: TokenState = {
  activeCategory: "All",
  sortBy: "price",
  sortDirection: "asc",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TokenCategory>) => {
      state.activeCategory = action.payload;
    },
    toggleSort: (state) => {
      state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
    },
    sortByName: (state) => {
      state.sortBy = "name";
      state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
    },
    sortByPrice: (state) => {
      state.sortBy = "price";
      state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
    },
  },
});

export const { setCategory, toggleSort, sortByName, sortByPrice } =
  tokenSlice.actions;

export default tokenSlice.reducer;
