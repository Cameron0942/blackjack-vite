//? REACT
import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client'

//? MATERIAL UI
import { Grid } from '@mui/material';

//? FUNCTIONS
import { DeckObject } from '../Deck/DeckObject';

//? REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setDealerBust, setPlayerStay, setResetHands } from '../store/gameState/gameSlice';

//? IMAGES
import cardBack from '../assets/Images/playing-card-back.jpg';

const ComputerInlay = () => {
    //? useState vars
    const [ArenaSize, setArenaSize] = useState({
        height: '35vh',
        width: '65vw'
    });
    const [hand, setHand] = useState({
        value: 0,
        image: []
    });
    const [firstHitDealer, setFirstHitDealer] = useState(true);

    //? REDUX vars
    const dispatch = useDispatch();
    const reduxPlayerBust = useSelector((state) => state.game.playerBust);
    const reduxPlayerStay = useSelector((state) => state.game.playerStay);
    const reduxDealerBust = useSelector((state) => state.game.dealerBust);
    const reduxResetHands = useSelector((state) => state.game.resetHands);
    
    //* Initial get hand
    useEffect(() => {
        const getHand = async () => {
            await DeckObject.getDeck();
            const card1 = DeckObject.getCard();
            const card2 = DeckObject.getCard();
            
            setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0])), image: [...previousState.image, card1[1]]}));
            setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
            // setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
        }
        getHand();
    }, []);


    const resetHand = () => {
        const timer = setTimeout(() => {
            setHand(previousState => ({...previousState, value: 0, image: []}));

            const getHand = async () => {
                await DeckObject.getDeck();
                const card1 = DeckObject.getCard();
                const card2 = DeckObject.getCard();
                
                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0]))}));
                setHand(previousState => ({...previousState, image: [...previousState.image, card1[1]]}));
                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0]))}));
                setHand(previousState => ({...previousState, image: [...previousState.image, card2[1]]}));
            }
            getHand();
        }, 2500);
        return () => clearTimeout(timer);
        
    };

    useEffect(() => {
        if(reduxPlayerStay && hand.value <= 16){
              
            const card = DeckObject.getCard();
            
                if (firstHitDealer){
                        setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card[0]))}));
                        setHand(previousState => ({...previousState, image: [...previousState.image, card[1]]}));
                        setFirstHitDealer(false);                    
                }
                else {
                    const timer = setTimeout(() => {
                        setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card[0]))}));
                        setHand(previousState => ({...previousState, image: [...previousState.image, card[1]]}));
                    }, 1200);
                    return () => clearTimeout(timer);
                }
                
                 
            
        }
        if(reduxPlayerStay && hand.value > 21) {
            setFirstHitDealer(true);  
            dispatch(setResetHands(true));
        }
        
    }, [reduxPlayerStay, hand.value]);


    useEffect(() => {
        if (reduxResetHands){
            resetHand();
            dispatch(setPlayerStay(false));
            dispatch(setDealerBust(false));
            dispatch(setResetHands(false));    
        }
        
    }, [reduxResetHands]);

    

    return(
        <>
            <Grid container spacing={2}  sx={{background: 'darkgreen', borderRadius: '5px', height: ArenaSize.height, width: ArenaSize.width, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 15}}>
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
        </>
    );
};

export default ComputerInlay;