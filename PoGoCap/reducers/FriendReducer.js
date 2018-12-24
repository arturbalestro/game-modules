import { combineReducers } from 'redux';
import { ADD_FRIEND } from '../actions/types';

const INITIAL_STATE = {
  current: [
    {
        username: 'ElieltoRR',
        nickname: 'Elielto',
        level: 40,
        caught: 15113,
        battlesWon: 2591,
        walkingDistance: '4.248.98 km',
        pokedex: 850
    },  
  ],
  possible: [
    {
        username: 'Julymisuzu',
        nickname: 'Juh',
        level: 34,
        caught: 4113,
        battlesWon: 591,
        walkingDistance: '1.248.98 km',
        pokedex: 350
    },
    {
        username: 'KekkaZanotti',
        nickname: 'Kelen',
        level: 38,
        caught: 16646,
        battlesWon: 1624,
        walkingDistance: '2.759.52 km',
        pokedex: 650
    },
    {
        username: 'DrThibes',
        nickname: 'Julio',
        level: 38,
        caught: 18631,
        battlesWon: 1134,
        walkingDistance: '2.375.31 km',
        pokedex: 650
    },
    {
        username: 'iamleojunior',
        nickname: 'Leo',
        level: 28,
        caught: 1512,
        battlesWon: 216,
        walkingDistance: '120.15 km',
        pokedex: 180
    }
  ],
};

const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FRIEND:
        // Pulls current and possible out of previous state
        // We do not want to alter state directly in case
        // another action is altering it at the same time
        const {
            current,
            possible,
        } = state;

        // Pull friend out of friends.possible
        // Note that action.payload === friendIndex
        const addedFriend = possible.splice(action.payload.index, 1);

        // And put friend in friends.current
        //alert('ADDING '+addedFriend);
        current.push(addedFriend);

        // Finally, update our redux state
        const newState = { current, possible };
        return newState;
    default:
        return state
  }
};

export default combineReducers({
  friends: friendReducer,
});