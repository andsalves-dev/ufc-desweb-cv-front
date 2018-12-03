export const UserStorage = {
    getUserData: () => {
        const userDataJSON = localStorage.getItem('user_data');

        try {
            if (userDataJSON) {
                return JSON.parse(userDataJSON);
            }
        } catch (error) {
            console.error(error);
            localStorage.removeItem('user_data');
        }

        return null;
    },

    setUserData: (data) => {
        if (!data) {
            localStorage.removeItem('user_data');
        } else {
            localStorage.setItem('user_data', JSON.stringify(data));
        }
    }
};