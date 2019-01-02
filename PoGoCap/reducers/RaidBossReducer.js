import { combineReducers } from 'redux';
import { ADD_RAID_BOSS } from '../actions/types';

const INITIAL_STATE = {
  raidBosses: [ 
    {
        name: 'Deoxys - Attack Forme',
        level: 'EX'
    },
    {
        name: 'Heatran',
        level: '5'
    },

    {
        name: 'Alolan Marowak',
        level: '4'
    },
    {
        name: 'Lapras',
        level: '4'
    },
    {
        name: 'Tyranitar',
        level: '4'
    },
    {
        name: 'Walrein',
        level: '4'
    },

    {
        name: 'Alolan Raichu',
        level: '3'
    },
    {
        name: 'Machamp',
        level: '3'
    },
    {
        name: 'Jynx',
        level: '3'
    },
    {
        name: 'Piloswine',
        level: '3'
    },
    
    {
        name: 'Alolan Exeggutor',
        level: '2'
    },
    {
        name: 'Dewgong',
        level: '2'
    },
    {
        name: 'Sneasel',
        level: '2'
    },
    {
        name: 'Mawile',
        level: '2'
    },

    {
        name: 'Magikarp',
        level: '1'
    },
    {
        name: 'Shellder',
        level: '1'
    },
    {
        name: 'Snorunt',
        level: '1'
    },
    {
        name: 'Shinx',
        level: '1'
    },
    {
        name: 'Buizel',
        level: '1'
    },
  ]
};

const raidBossReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RAID_BOSS:
        // Pulls raids out of previous state
        // We do not want to alter state directly in case
        // another action is altering it at the same time
        const {
            raidBosses
        } = state;

        // Add new raid to array
        raidBosses.push(action.payload);

        // Finally, update our redux state
        const newState = { raidBosses };
        return newState;
    default:
        return state
  }
};

export default combineReducers({
  raidBosses: raidBossReducer,
});