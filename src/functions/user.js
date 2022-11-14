import {user} from '../api';

// Получить профиль
export const getProfile = async (token) => {
    const profile = await user.get('profile/my', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return profile;
}

// Изменить никнейм пользователя
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

// Изменить фото профиля пользователя
export const changeImage = (token, formData) => {
    const updatedProfile = user.post('profile/my/add_image', formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return updatedProfile;
}

// Удалить роль пользователю
export const deleteUserRole = (token, publicAddress, roleName) => {
    const roleDeleted = user.delete(`roles/${publicAddress}/${roleName}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return roleDeleted;
}

// Добавить пользователю роль
export const addUserRole = (token, publicAddress, roleName) => {
    const roleAdded = user.post(`roles/${publicAddress}/${roleName}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return roleAdded;
}

// Получить роли пользователя
export const getUserRoles = (token, publicAddress) => {
    const roleList = user.get(`roles/${publicAddress}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return roleList;
}

// Получить пользователей, у которых есть определенная роль - roleName
export const getUsersByRole = (token, roleName) => {
    const usersListByRole = user.get(`users_by_role/${roleName}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return usersListByRole;
}