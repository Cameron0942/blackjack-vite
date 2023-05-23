import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dealerHandValue: 0,
    dealerBust: false,
    dealerStay: false,
    playerHandValue: 0,
    playerBust: false,
    playerStay: false,
    resetHands: false,
    winner: '',
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
        setPlayerHandValue: (state, action) => {
            state.playerHandValue = action.payload;
        },
        setPlayerBust: (state, action) => {
            state.playerBust = action.payload;
        },
        setPlayerStay: (state, action) => {
            state.playerStay = action.payload;
        },
        setDealerBust: (state, action) => {
            state.dealerBust = action.payload;
        },
        setDealerHandValue: (state, action) => {
            state.dealerHandValue = action.payload;
        },
        setResetHands: (state, action) => {
            state.resetHands = action.payload;
        },
        resetWinner: (state) => {
            state.winner = '';
        },
        evaluateWinner: (state) => {
            let phv = state.playerHandValue;
            let pb = state.playerBust;
            let dhv = state.dealerHandValue;
            let db = state.dealerBust;

            if(pb) state.winner = 'Dealer';
            else if(db) state.winner = 'Player';
            else if(phv > dhv) state.winner = 'Player';
            else if(dhv > phv) state.winner = 'Dealer';
            if(phv === dhv) state.winner = 'Push';
            // else state.winner = '';
        },
    }
});

export const { increment, decrement, reset, incrementByAmount, playerBust, setPlayerBust, setResetHands, setPlayerStay, setPlayerHandValue, setDealerBust, dealerBust, setDealerHandValue, evaluateWinner, winner, resetWinner } = gameSlice.actions;

export default gameSlice.reducer;