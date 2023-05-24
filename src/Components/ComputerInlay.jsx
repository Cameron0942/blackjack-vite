//? REACT
import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client'

//? MATERIAL UI
import { Grid } from '@mui/material';

//? FUNCTIONS
import { DeckObject } from '../Deck/DeckObject';

//? REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setDealerBust, setDealerHandValue, setPlayerStay, setResetHands, evaluateWinner, resetWinner } from '../store/gameState/gameSlice';

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

    const [hiddenCardCopy, setHiddenCardCopy] = useState({
        value: 0,
        image: []
    });

    const [shownCardCopy, setShownCardCopy] = useState({
        value: 0,
        image: []
    });

    const [firstHitDealer, setFirstHitDealer] = useState(true);
    

    //? REDUX vars
    const dispatch = useDispatch();
    const reduxPlayerBust = useSelector((state) => state.game.playerBust);
    const reduxPlayerStay = useSelector((state) => state.game.playerStay);
    const reduxResetHands = useSelector((state) => state.game.resetHands);
    const reduxWinner = useSelector((state) => state.game.winner);

    
    useEffect(() => {
        if (reduxWinner !== '') {
            dispatch(setResetHands(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxWinner]);


    //if player busts then show the hidden card, but from the copied version
    useEffect(() => {
        if (reduxPlayerBust) {
            setHand(previousState => ({
                ...previousState,
                image: [hiddenCardCopy.image[0], ...previousState.image.slice(1)]
            }));
        }
    }, [hiddenCardCopy.image, reduxPlayerBust])
    
    
    //* Initial get hand
    useEffect(() => {
        const getHand = async () => {
            await DeckObject.getDeck();
            let card1 = DeckObject.getCard();
            let card2 = DeckObject.getCard();

            //! I am not letting the dealer get aces because I don't feel like building the dealer ace logic
            if (card1[0] === 11){
                while(card1[0] !== 11){
                    card1 = DeckObject.getCard();
                }
            }

            if (card2[0] === 11){
                while(card2[0] === 11){
                    card2 = DeckObject.getCard();
                }
            }

            setShownCardCopy(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
            setHiddenCardCopy(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0])), image: [...previousState.image, card1[1]]}));
            
            setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0])), image: [...previousState.image, cardBack]}));
            setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
            // setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, cardBack]}));
        }
        getHand();
    }, []);


    const resetHand = () => {
        dispatch(resetWinner());
        const timer = setTimeout(() => {
            setHand(previousState => ({...previousState, value: 0, image: []}));
            setHiddenCardCopy(previousState => ({...previousState, value: 0, image: []}));
            setShownCardCopy(previousState => ({...previousState, value: 0, image: []}));
            setFirstHitDealer(true); 

            const getHand = async () => {
                await DeckObject.getDeck();
                let card1 = DeckObject.getCard();
                let card2 = DeckObject.getCard();

                //! I am not letting the dealer get aces because I don't feel like building the dealer ace logic
                if (card1[0] === 11){
                    while(card1[0] === 11){
                        card1 = DeckObject.getCard();
                    }
                }
    
                if (card2[0] === 11){
                    while(card2[0] === 11){
                        card2 = DeckObject.getCard();
                    }
                }

                setShownCardCopy(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
                setHiddenCardCopy(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0])), image: [...previousState.image, card1[1]]}));
                
                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card1[0])), image: [...previousState.image, cardBack]}));
                setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card2[0])), image: [...previousState.image, card2[1]]}));
            }
            getHand();
        }, 2500);
        return () => clearTimeout(timer);
        
    };

    //* Handles when the players STAYS
    useEffect(() => {

        //* show hidden card by replacing cardBack image with card copy image 
        //* And show score
        if (reduxPlayerStay) {
            setHand(previousState => ({
                ...previousState,
                image: [hiddenCardCopy.image[0], ...previousState.image.slice(1)]
            })); 
            setFirstHitDealer(false); 
        }

        //* Get cards if plaer stayed and hand is less than 17
        if(reduxPlayerStay && hand.value <= 16){
              
            let card = DeckObject.getCard();

            if (card[0] === 11){
                while(card[0] === 11){
                    card = DeckObject.getCard();
                }
            }
            
            
            //* more reactive for UI so first card flys in as soon as button is pressed
            // set hand to the new gotten card
                if (firstHitDealer){
                    const timer = setTimeout(() => {
                    const updatedValue = parseInt(hand.value) + parseInt(card[0]);
                    setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card[0]))}));
                    setHand(previousState => ({...previousState, image: [...previousState.image, card[1]]}));
                    setFirstHitDealer(false);  
                    dispatch(setDealerHandValue(updatedValue));  
                }, 1200);    
                return () => clearTimeout(timer);          
                }
                //* delay for subsequent card pulls
                else {
                    const timer = setTimeout(() => {
                        const updatedValue = parseInt(hand.value) + parseInt(card[0]);
                        setHand(previousState => ({...previousState, value:(parseInt(previousState.value) + parseInt(card[0]))}));
                        setHand(previousState => ({...previousState, image: [...previousState.image, card[1]]}));
                        dispatch(setDealerHandValue(updatedValue));
                    }, 1200);
                    return () => clearTimeout(timer);
                }
                
                
            
        }
        if(reduxPlayerStay && hand.value > 21) {
            dispatch(setResetHands(true));
            dispatch(setDealerBust(true));
            dispatch(evaluateWinner());
        }
        if(reduxPlayerStay && hand.value >= 17 && hand.value <= 21){
            dispatch(evaluateWinner());
        }
            
        
        
    }, [reduxPlayerStay, hand.value]);

    useEffect(() => {
        dispatch(setDealerHandValue(hand.value));
        dispatch(setDealerBust(false));

        if(hand.value > 21){
            dispatch(setDealerBust(true));
            dispatch(evaluateWinner());
        }
    }, [hand.value]);
    
    useEffect(() => {
        if (reduxResetHands){
            resetHand();
            dispatch(setPlayerStay(false));
            dispatch(setResetHands(false));    
        }
    }, [reduxResetHands]);

    

    return(
        <>
            <Grid container spacing={2}  sx={{background: 'rgba(0, 0, 0, 0.3);', borderRadius: '5px', height: ArenaSize.height, width: ArenaSize.width, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 0}}>
                <Grid item md={9} sx={{}}>
                    {hand.image.map((image, index) => 
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
                    <span className={`dealer-hand-value-wrapper`}><span className='dealer-hand-value'>{!firstHitDealer || reduxPlayerBust ? hand.value : shownCardCopy.value}</span></span><span className='dealer-text'> Dealer</span>
                </Grid>
            </Grid>
        </>
    );
};

export default ComputerInlay;