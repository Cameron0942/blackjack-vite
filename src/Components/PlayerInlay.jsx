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
import { setPlayerBust, setResetHands, setPlayerStay, setPlayerHandValue, evaluateWinner, winner, resetWinner } from '../store/gameState/gameSlice';


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
    const reduxResetHands = useSelector((state) => state.game.resetHands);
    const reduxPlayerStay = useSelector((state) => state.game.playerStay);
    const reduxWinner = useSelector((state) => state.game.winner);

    

    const [isBust, setIsBust] = useState(false);
    const [disableStay, setDisableStay] = useState(false);
    const [disableHit, setDisableHit] = useState(false);
    const [winner, setWinner] = useState('');

    
    useEffect(() => {
        if (reduxWinner !== '') {
            setWinner(reduxWinner)
        }
        
    }, [reduxWinner])

    const getCardHandler = () => {
        if (isBust || hand.value >= 21){
            return;
        }
        const card = DeckObject.getCard();
        setHand(previousState => ({...previousState, value: (parseInt(previousState.value) + parseInt(card[0]))}));
        setHand(previousState => ({...previousState, image: [...previousState.image, card[1]]}));
    };

    const stayHandler = () => {
        setDisableStay(true);
        setDisableHit(true);
        dispatch(setPlayerStay(true));
    };

    const resetHand = () => {
        dispatch(resetWinner());
        dispatch(setPlayerStay(false));
        const timer = setTimeout(() => {
            //* Reset hand useState
            setHand(previousState => ({...previousState, value: 0, image: []}));
            dispatch(setPlayerBust(false));
            
            
            const getHand = async () => {
                await DeckObject.getDeck();
                const card1 = DeckObject.getCard();
                const card2 = DeckObject.getCard();

                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0])), image: [...previousState.image, card1[1]]}));
                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
            }
            getHand();
            setDisableStay(false);
            setDisableHit(false);
            }, 2500);
        return () => clearTimeout(timer);

    };

    const checkScore = () => {
        if (hand.value === 21) {
            const timer = setTimeout(() => {
                dispatch(setPlayerStay(true));
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (hand.value > 21) {
            setIsBust(true);
            setDisableHit(true);
            setDisableStay(true);
            dispatch(setPlayerBust(true));
            dispatch(setResetHands(true));
            dispatch(evaluateWinner());
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



    //* Whenever hand.value changes
    useEffect(() => {
        checkScore(hand.value);
        dispatch(setPlayerHandValue(hand.value));
        // dispatch(evaluateWinner());
    }, [hand.value]);



    useEffect(() => {
        if (reduxResetHands){
            resetHand();
            setIsBust(false);
            
            dispatch(setResetHands(false));
        }
        
    }, [reduxResetHands]); 

    return(
        <>
            <Grid container spacing={2}  sx={{background: 'rgba(0, 0, 0, 0.3);', borderRadius: '5px', height: ArenaSize.height, width: ArenaSize.width, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, paddingLeft: 15 }}>
                <Grid item md={9} sx={{}}>
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
                <Grid item md={3} sx={{display: 'flex', alignItems: 'center'}}>
                    <span className={`player-hand-value-wrapper`}><span className={`player-hand-value ${hand.value === 21 ? 'player-21' : ''}`}>{hand.value}</span></span><span className='player-text'> Player</span>
                </Grid>
            </Grid>
            <div style={{textAlign: 'center'}}>
                <h1>{ winner }</h1>
            <Button disabled={disableHit} variant="contained" onClick={getCardHandler} sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                HIT
            </Button>
            <Button disabled={disableStay} variant="contained" onClick={stayHandler} sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                STAY
            </Button>
            {/* <Button variant="contained" sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                DOUBLE
            </Button>
            <Button variant="contained" sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                SPLIT
            </Button> */}
            </div>            
        </>
    );
};

export default PlayerInlay;