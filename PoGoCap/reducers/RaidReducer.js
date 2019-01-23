import axios from 'axios';

import { combineReducers } from 'redux';
import { ADD_RAID } from '../actions/types';

// const INITIAL_STATE = {
//   currentRaids: [
//     {
//         raidLvl: '5',
//         raidBoss: 'Heatran',
//         gym: 'Rotary Norte',
//         openingTime: '13:30',
//         groups: [
//             {
//                 battleTime: '13:50',
//                 members: [
//                     {
//                         name: 'Auro',
//                         team: 'Mystic',
//                         level: '34',
//                         additionalAccounts: 0,
//                         guests: 0
//                     },
//                     {
//                         name: 'ArtemisiaDK',
//                         team: 'Instinct',
//                         level: '37',
//                         additionalAccounts: 0,
//                         guests: 0
//                     },
//                     {
//                         name: 'Elielto',
//                         team: 'Instinct',
//                         level: '40',
//                         additionalAccounts: 0,
//                         guests: 0
//                     },
//                     {
//                         name: 'Jorge',
//                         team: 'Instinct',
//                         level: '39',
//                         additionalAccounts: 0,
//                         guests: 0
//                     },
//                     {
//                         name: 'Fred',
//                         team: 'Valor',
//                         level: '32',
//                         additionalAccounts: 0,
//                         guests: 1
//                     }
//                 ]
//             },
//             {
//                 battleTime: '14:00',
//                 members: [
//                     {
//                         name: 'Auro',
//                         team: 'Mystic',
//                         level: '34',
//                         additionalAccounts: 0,
//                         guests: 0
//                     },
//                     {
//                         name: 'Elielto',
//                         team: 'Instinct',
//                         level: '40',
//                         additionalAccounts: 0,
//                         guests: 0
//                     },
//                     {
//                         name: 'Dio',
//                         team: 'Mystic',
//                         level: '38',
//                         additionalAccounts: 1,
//                         guests: 0
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         raidLvl: '3',
//         raidBoss: 'Jynx',
//         gym: 'Fonte Total',
//         openingTime: '11:00',
//         groups: [
//             {
//                 battleTime: '11:15',
//                 members: [
//                     {
//                         name: 'Guilherme',
//                         team: 'Valor',
//                         level: '31',
//                         additionalAccounts: 0,
//                         guests: 0
//                     },
//                     {
//                         name: 'Martina',
//                         team: 'Mystic',
//                         level: '34',
//                         additionalAccounts: 0,
//                         guests: 0
//                     }
//                 ]
//             }
//         ]
//     }  
//   ]
// };

const INITIAL_STATE = axios.get(`https://pogocap.firebaseio.com/currentRaids`)
.then(raids => {
  console.log('###getting raids!!!', raids);
  return raids;
})

const raidReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RAID:
        // Pulls raids out of previous state
        // We do not want to alter state directly in case
        // another action is altering it at the same time
        const {
            currentRaids
        } = state;

        // Add new raid to array
        currentRaids.push(action.payload.raid);

        // Finally, update our redux state
        const newState = { currentRaids };
        return newState;
    default:
        return state
  }
};

export default combineReducers({
  raids: raidReducer,
});