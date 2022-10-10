import {user} from '../api';

export const getProfile = async (token) => {
    const profile = await user.get('my', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return profile;
}