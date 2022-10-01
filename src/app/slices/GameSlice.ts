import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Game from "../../Entities/Game";

export const GameSlice = createSlice({
  name: "counter",
  initialState: Game.getInstance(),
  reducers: {
    toggleMod: (state, action: PayloadAction<boolean>) => {
      state = Game.setWithRepetitions(action.payload);
    },
    guess: (state, action: PayloadAction<string>) => {
      state = Game.getInstance();
    }
  }
});

export const { toggleMod } = GameSlice.actions;
export default GameSlice.reducer;
