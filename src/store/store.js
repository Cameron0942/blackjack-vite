import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './gameState/counterSlice';
import gameReducer from './gameState/gameSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        game: gameReducer,
    }
});