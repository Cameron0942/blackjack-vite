//? REACT
import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client'

//? MATERIAL UI
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

//? FUNCTIONS
import { DeckObject } from '../Deck/DeckObject';

//? REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setBust, setResetHands, setPlayerStay, dealerBust, setDealerBust } from '../store/gameState/gameSlice';


const PlayerInlay = () => {
    const [ArenaSize, setArenaSize] = useState({
        height: '35vh',
        width: '65vw'
    });

    const [hand, setHand] = useState({
        value: 0,
        image: []
    });

    //? REDUX vars
    const dispatch = useDispatch();
    const reduxPlayerBust = useSelector((state) => state.game.playerBust);
    const reduxHandValue = useSelector((state) => state.game.playerHandValue);
    const reduxResetHands = useSelector((state) => state.game.resetHands);
    const reduxPlayerStay = useSelector((state) => state.game.playerStay);
    const reduxDealerBust = useSelector((state) => state.game.dealerBust);
    

    const [isBust, setIsBust] = useState(false);

    const getCardHandler = () => {
        if (isBust || hand.value === 21){
            return;
        }
        const card = DeckObject.getCard();
        setHand(previousState => ({...previousState, value: (parseInt(previousState.value) + parseInt(card[0]))}));
        setHand(previousState => ({...previousState, image: [...previousState.image, card[1]]}));
        
    };

    const resetHand = () => {
        dispatch(setPlayerStay(false));
        const timer = setTimeout(() => {
            //* Reset hand useState
            setHand(previousState => ({...previousState, value: 0, image: []}));
            
            
            const getHand = async () => {
                await DeckObject.getDeck();
                const card1 = DeckObject.getCard();
                const card2 = DeckObject.getCard();

                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0])), image: [...previousState.image, card1[1]]}));
                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
            }
            getHand();
            }, 2500);
        return () => clearTimeout(timer);

    };

    const checkScore = () => {
        if (hand.value === 21) {
            return;
        }
        if (hand.value > 21) {
            setIsBust(true);
            dispatch(setBust(true));
            dispatch(setResetHands(true));
        }
        else if (hand.value < 21) {
            dispatch(setResetHands(false));
        }
        
    }

    //* Initial get hand
    useEffect(() => {
        dispatch(setPlayerStay(false));
        const getHand = async () => {
            await DeckObject.getDeck();
            const card1 = await DeckObject.getCard();
            const card2 = await DeckObject.getCard();
            
            setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0]))}));
            setHand(previousState => ({...previousState, image: [...previousState.image, card1[1]]}));
            setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0]))}));
            setHand(previousState => ({...previousState, image: [...previousState.image, card2[1]]}));
        }
        getHand();
    }, []);



    //* Game logic for if the hand is > 21
    useEffect(() => {
        checkScore(hand.value);
    }, [hand.value]);



    useEffect(() => {
        if (reduxResetHands){
            resetHand();
            setIsBust(false);
            dispatch(setBust(false));
            dispatch(setResetHands(false));    
        }
        
    }, [reduxResetHands]); 

    return(
        <>
            <Grid container spacing={2}  sx={{background: '#3b362a', borderRadius: '5px', height: ArenaSize.height, width: ArenaSize.width, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 15}}>
                <Grid item md={10} sx={{}}>
                    {hand.image.map((image, index) => 
                        // <img className='card' key={index} src={image} alt="" style={{maxHeight: '300px'}} />
                        <img
                            className='card'
                            key={index}
                            src={image}
                            alt=""
                            style={{ maxHeight: '300px', position: 'absolute', marginLeft: `${index * 75}px` }}
                        />
                    )}
                </Grid>
                <Grid item md={2}>
                    <h1>{hand.value}</h1>
                </Grid>
            </Grid>
            <div style={{textAlign: 'center'}}>
                <h1>{ isBust ? 'You Lost' : 'You Won'}</h1>
            <Button variant="contained" onClick={getCardHandler} sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                HIT
            </Button>
            <Button variant="contained" onClick={() => {dispatch(setPlayerStay(true))}} sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                STAY
            </Button>
            <Button variant="contained" sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                DOUBLE
            </Button>
            <Button variant="contained" sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                SPLIT
            </Button>
            </div>            
        </>
    );
};

export default PlayerInlay;