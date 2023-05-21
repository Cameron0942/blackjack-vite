import axios from "axios";

//? Maybe consider getting the entire deck at once and saving it in the object
export const DeckObject = {
    deckId: '',
    deck: [],

    async getDeck() {
        try {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const data = response.data;
            this.deckId = data.deck_id;
            
          } catch (error) {
            // Handle errors
            console.error("Error getting deck from api", error);
          }

          await this.getAllCardsFromDeck();
    },

    

    async getAllCardsFromDeck() {
      try {
        if (!this.deckId) {
          await this.getDeck();
        }
        
        //* Get card
        const response = await axios.get(
          `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=52`
        );
        const data = response.data;
        // console.log("this is datA", data.cards)

        let deckArray = data.cards.map(item => {return [this.sanitizeCard(item.value), item.image]})

        deckArray.forEach(value => {
              this.deck.push(value);
            });

      } catch (error) {
        console.error("Error getting all cards from deck", error);
      }
    },

    deckIndex: 0,
     getCard() {
      if (this.deck.length === 0) {
        // await this.getAllCardsFromDeck();
        console.log("Get deck first")
      }
      this.deckIndex++;
      return this.deck[this.deckIndex];
    },
  

    sanitizeCard(cardValue) {
      switch(cardValue){
        case 'KING':
          return 10;
        case 'QUEEN':
          return 10;
        case 'JACK':
          return 10;
        case 'ACE':
          return 1;

        default:
          return cardValue === "ACE" ? cardValue : parseInt(cardValue);
      }
    }
}



// async getCard() {
    //   try {
    //     if (!this.deckId) {
    //       await this.getDeck();
    //     }
        
    //     const response = await axios.get(
    //       `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`
    //     );
    //     const data = response.data;

    //     let CardObject = {
    //       value: this.sanitizeCard(data.cards[0].value),
    //       image: data.cards[0].image,
    //     };
        
    //     return CardObject;
    //   } catch (error) {
    //     console.error("Error getting card", error);
    //   }
    // },