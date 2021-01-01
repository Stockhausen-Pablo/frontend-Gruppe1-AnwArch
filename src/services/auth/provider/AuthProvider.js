import { AuthProvider } from 'react-admin';

const authProvider = {
    // authentication
    login: ({ username, password }) =>  {
        const request = new Request('localhost/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkError: (error) => { /* ... */ },
    checkAuth: () => { /* ... */ },
    logout: () => { /* ... */ },
    getIdentity: () => { /* ... */ },
    // authorization
    getPermissions: (params) => { /* ... */ },
}

export default authProvider;