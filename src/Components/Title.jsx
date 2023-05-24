//? IMAGES
import TitleSprite from '../assets/Images/title-sprite.svg';

const Title = () => {

    return(
        <div style={{textAlign: 'center', marginBottom: '2vh'}}>
            <img src={TitleSprite} alt="Blackjack Logo" style={{maxHeight: '100px'}} />
            <span className="title">  Blackjack (21)</span>
            <img src={TitleSprite} alt="Blackjack Logo" style={{maxHeight: '100px'}} />
        </div>
        
    );
}

export default Title;