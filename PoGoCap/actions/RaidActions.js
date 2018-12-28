import { ADD_RAID } from './types';

export const addRaid = (raid, index) => (
    {
        type: ADD_RAID,
        payload: {
            raid,
            index
        },
    }
);