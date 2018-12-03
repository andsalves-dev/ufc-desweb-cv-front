export const userHomeURL = (user) => {
    switch (user && user.role) {
        case 'admin':
            return '/admin';
        default:
            return '/user';

    }
};