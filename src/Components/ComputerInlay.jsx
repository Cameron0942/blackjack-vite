//? REACT
import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client'

//? MATERIAL UI
import { Grid } from '@mui/material';

//? FUNCTIONS
import { DeckObject } from '../Deck/DeckObject';

const ComputerInlay = () => {
    const [ArenaSize, setArenaSize] = useState({
        height: '35vh',
        width: '65vw'
    });

    const [hand, setHand] = useState({
        value: 0,
        image: []
    });

    const [isBust, setIsBust] = useState(false);

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
            <Grid container spacing={2}  sx={{background: 'darkgreen', borderRadius: '5px', height: ArenaSize.height, width: ArenaSize.width, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 50}}>
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