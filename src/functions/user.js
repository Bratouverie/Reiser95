import {user} from '../api';

export const getProfile = async (token) => {
    const profile = await user.get('profile/my', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return profile;
}

export const changeNick = (token, nick) => {
    const updatedProfile = user.put('profile/my', {
        username: nick
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return updatedProfile;
}

export const changeImage = (token, formData) => {
    const updatedProfile = user.post('profile/my/add_image', formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return updatedProfile;
}

export const deleteUserRole = async (token, publicAddress, roleName) => {
    const roleDeleted = await user.delete(`roles/${publicAddress}/${roleName}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return roleDeleted;
}

export const addUserRole = async (token, publicAddress, roleName) => {
    const roleAdded = await user.post(`roles/${publicAddress}/${roleName}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return roleAdded;
}

export const getUserRoles = async (token, publicAddress) => {
    const roleList = await user.get(`roles/${publicAddress}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return roleList;
}

export const getUsersByRole = async (token, roleName) => {
    const usersListByRole = await user.get(`users_by_role/${roleName}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return usersListByRole;
}