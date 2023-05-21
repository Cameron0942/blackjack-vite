import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dealerHandValue: 0,
    dealerBust: false,
    dealerStay: false,
    playerHandValue: 0,
    playerBust: false,
    playerStay: false,
    resetHands: false,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
        setBust: (state, action) => {
            state.playerBust = action.payload;
        },
        setPlayerStay: (state, action) => {
            state.playerStay = action.payload;
        },
        setDealerBust: (state, action) => {
            state.dealerBust = action.payload;
        },
        setResetHands: (state, action) => {
            state.resetHands = action.payload;
        },
    }
});

export const { increment, decrement, reset, incrementByAmount, setBust, setResetHands, setPlayerStay, setDealerBust, dealerBust } = gameSlice.actions;

export default gameSlice.reducer;