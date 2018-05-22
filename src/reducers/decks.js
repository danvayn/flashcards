import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD_TO_DECK,
  REMOVE_ALL_DECKS,
  POPULATE_DECKS,
} from '../actions/';

const initialState = {
};
function decks (state = initialState, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      }
    case REMOVE_ALL_DECKS:
      return {
      }

    case POPULATE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          cards: [
            ...state[action.deckTitle].cards,
            action.card
          ]
        }
      }

    default :
      return state
  }
}

export default decks
