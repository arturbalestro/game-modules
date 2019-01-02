import { ADD_RAID_BOSS } from './types';

export const addRaidBoss = (raidBoss) => (
    {
        type: ADD_RAID_BOSS,
        payload: raidBoss,
    }
);