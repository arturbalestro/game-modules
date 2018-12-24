import { ADD_FRIEND } from './types';

export const addFriend = (friend, index) => (
    {
        type: ADD_FRIEND,
        payload: {
            friend,
            index
        },
    }
);