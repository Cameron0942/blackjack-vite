//? COMPONENTS
import PlayerInlay from "./PlayerInlay";
import Title from "./Title";
import ComputerInlay from "./ComputerInlay";


const Page = () => {

    return(
        <div style={{height: '100vh', width: '100vw', backgroundColor: '#32943d', padding: 0, margin: 0}}>
            <Title />
            <ComputerInlay />
            <PlayerInlay />
        </div>
    );
};

export default Page;