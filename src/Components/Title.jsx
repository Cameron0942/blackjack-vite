//? IMAGES
import TitleSprite from '../assets/Images/title-sprite.svg';

const Title = () => {

    return(
        <div style={{textAlign: 'center', marginBottom: '2vh'}}>
            <img src={TitleSprite} alt="Blackjack Logo" style={{maxHeight: '100px', marginRight: 25}} />
            <span className="title">BLACKJACK</span>
            <img src={TitleSprite} alt="Blackjack Logo" style={{maxHeight: '100px', marginLeft: 25}} />
        </div>
        
    );
}

export default Title;