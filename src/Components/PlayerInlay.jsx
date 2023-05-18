//? REACT
import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client'

//? MATERIAL UI
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

//? FUNCTIONS
import { DeckObject } from '../Deck/DeckObject';

//testing something
const exampleFunction = () => {
    console.log('hello');
  };


const PlayerInlay = () => {
    const [ArenaSize, setArenaSize] = useState({
        height: '35vh',
        width: '65vw'
    });

    const [hand, setHand] = useState({
        value: 0,
        image: []
    });

    const [isBust, setIsBust] = useState(false);

    const getCardHandler = () => {
        if (isBust || hand.value === 21){
            return;
        }
        const card = DeckObject.getCard();
        console.log("Here's the gotten card", card[0])
        setHand(previousState => ({...previousState, value: (parseInt(previousState.value) + parseInt(card[0]))}));
        setHand(previousState => ({...previousState, image: [...previousState.image, card[1]]}));
        
    }

    const checkScore = () => {
        if (hand.value === 21) {
            return;
        }
        if (hand.value > 21) {
            setIsBust(true);
            const timer = setTimeout(() => {
                alert('you lose');
                resetHand();
            }, 1000);
            return () => clearTimeout(timer);
            
        }
        
    }

    const resetHand = () => {
        setHand(previousState => ({...previousState, value: 0}));
        setHand(previousState => ({...previousState, image: []}));

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
        setIsBust(false);
    }

    // //* Game logic for if the hand is > 21
    useEffect(() => {
        checkScore(hand.value);
    }, [hand.value]);
    

    //* Initial get hand
    useEffect(() => {
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

    return(
        <>
            <Grid container spacing={2}  sx={{background: '#3b362a', borderRadius: '5px', height: ArenaSize.height, width: ArenaSize.width, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 50}}>
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
            <Button variant="contained" onClick={getCardHandler} sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
                HIT
            </Button>
            <Button variant="contained" sx={{padding: 4, fontSize: 45}} startIcon={<AddIcon />}>
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