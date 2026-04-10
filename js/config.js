/**
 * Global configuration for the frontend.
 * Update these values before deployment.
 */
window.APP_CONFIG = {
    // Backend API server URL (your existing server domain)
    API_BASE_URL: 'https://testapi.valuechallenge.ai',

    // Static assets base URL (where CSS/JS/images are served from)
    // If you copy public/static/ to frontend/static/, set this to ''
    // Otherwise point to your API server
    STATIC_BASE_URL: '',

    // Base path for this frontend deployment.
    // Set to '' if deployed at the domain root (e.g. https://example.github.io/).
    // Set to '/ValueChallenge' if deployed at a subdirectory (e.g. https://org.github.io/ValueChallenge/).
    BASE_URL: '/ValueChallenge',
};
