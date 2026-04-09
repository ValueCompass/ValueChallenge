/**
 * Authentication module - handles JWT tokens and user state.
 */
window.Auth = (function () {
    const TOKEN_KEY = 'msra_jwt_token';
    const USER_KEY = 'msra_user_info';

    function getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    function setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    function removeToken() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    function getUser() {
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;
        try { return JSON.parse(raw); } catch (e) { return null; }
    }

    function setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    function isLoggedIn() {
        const token = getToken();
        if (!token) return false;
        // Check expiration from JWT payload
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    }

    function logout() {
        removeToken();
        window.location.href = '/auth/login.html';
    }

    /**
     * Wrapper for fetch that automatically adds Authorization header.
     */
    function apiFetch(url, options) {
        options = options || {};
        options.headers = options.headers || {};

        const token = getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        // Prepend API base URL if the url is relative
        if (url.startsWith('/')) {
            url = window.APP_CONFIG.API_BASE_URL + '/api' + url;
        }

        return fetch(url, options).then(function (response) {
            return response.json().then(function (data) {
                if (data.code === 401) {
                    removeToken();
                    window.location.href = '/auth/login.html';
                    throw new Error('Unauthorized');
                }
                return data;
            });
        });
    }

    /**
     * POST JSON data to API.
     */
    function apiPost(url, data) {
        return apiFetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    /**
     * POST FormData to API (for file uploads).
     */
    function apiPostForm(url, formData) {
        return apiFetch(url, {
            method: 'POST',
            body: formData
        });
    }

    /**
     * GET data from API.
     */
    function apiGet(url) {
        return apiFetch(url, { method: 'GET' });
    }

    return {
        getToken: getToken,
        setToken: setToken,
        removeToken: removeToken,
        getUser: getUser,
        setUser: setUser,
        isLoggedIn: isLoggedIn,
        logout: logout,
        apiFetch: apiFetch,
        apiPost: apiPost,
        apiPostForm: apiPostForm,
        apiGet: apiGet
    };
})();
