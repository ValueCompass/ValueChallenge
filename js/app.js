/**
 * Shared layout and utility functions for all pages.
 */
window.App = (function () {
    var S = window.APP_CONFIG.STATIC_BASE_URL;

    /**
     * Get the common <head> CSS + JS includes as HTML string.
     */
    function getHeadIncludes(title) {
        title = title || 'Global AI Values Challenge';
        return ''
            + '<meta charset="UTF-8">'
            + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
            + '<title>' + title + '</title>'
            + '<link href="' + S + '/static/css/bootstrap.min.css" rel="stylesheet">'
            + '<link href="' + S + '/static/css/style.css" rel="stylesheet">'
            + '<link rel="stylesheet" href="' + S + '/static/fontawesome/css/all.min.css">'
            + '<script src="' + S + '/static/js/chart.min.js"><\/script>'
            + '<link href="' + S + '/static/css/main.css" rel="stylesheet">'
            + '<link href="' + S + '/static/css/dev.css" rel="stylesheet">'
            + '<link rel="stylesheet" href="' + S + '/static/css/cookieconsent.css">'
            + '<script type="text/javascript" src="' + S + '/static/js/cookieconsent.umd.js"><\/script>'
            + '<style>a:hover{text-decoration:unset;}</style>';
    }

    /**
     * Render the user header (top-right dropdown).
     */
    function renderHeader() {
        var el = document.getElementById('header-placeholder');
        if (!el) return;
        if (!Auth.isLoggedIn()) { el.innerHTML = ''; return; }
        var user = Auth.getUser();
        el.innerHTML = '<header class="page-header">'
            + '<div class="user-nav navbar-toggler-icon">'
            + '<img src="' + S + '/static/images/user-icon.png" class="user-icon" alt="">'
            + '<span>' + (user ? user.username : '') + '</span>'
            + '<img src="' + S + '/static/images/arrow-down.png" alt="" class="arrow-down">'
            + '</div>'
            + '<div class="user-dropdown" id="navbarNav" style="display:none">'
            + '<a href="/profile/index.html">My Profile</a>'
            + '<a href="/profile/index.html">My Submission</a>'
            + '<a href="/profile/change_password.html">Change Password</a>'
            + '<a href="javascript:void(0);" onclick="Auth.logout()">Logout</a>'
            + '</div></header>';
    }

    /**
     * Render the navigation bar.
     */
    function renderNav(currentPage) {
        var el = document.getElementById('nav-placeholder');
        if (!el) return;
        var loggedIn = Auth.isLoggedIn();

        function cls(page) { return currentPage === page ? 'on' : ''; }
        function link(href, page, icon, label) {
            if (loggedIn) {
                return '<a href="' + href + '" class="' + cls(page) + '">'
                    + '<img src="' + S + '/static/images/' + icon + '" alt="">'
                    + '<span>' + label + '</span></a>';
            } else {
                if (page === 'index') {
                    return '<a href="' + href + '" class="' + cls(page) + '">'
                        + '<img src="' + S + '/static/images/' + icon + '" alt="">'
                        + '<span>' + label + '</span></a>';
                }
                return '<a href="javascript:;" class="' + cls(page) + ' no-login-click">'
                    + '<img src="' + S + '/static/images/' + icon + '" alt="">'
                    + '<span>' + label + '</span></a>';
            }
        }

        el.innerHTML = '<div class="container"><nav>'
            + link('/index.html', 'index', 'overview@2x.png', 'Overview')
            + link('/about.html', 'about', 'Guideline@2x.png', 'Guideline')
            + link('/submission/submit.html', 'submit', 'Submission@2x.png', 'Submission')
            + link('/gallery.html', 'gallery', 'Leaderboard@2x.png', 'Leaderboard')
            + '</nav></div>';
    }

    /**
     * Render the footer.
     */
    function renderFooter() {
        var el = document.getElementById('footer-placeholder');
        if (!el) return;
        el.innerHTML = '<div class="footer-component"><div class="main-container"><p>'
            + '<a target="_blank" href="https://support.microsoft.com/contactus">Contact Us</a> | '
            + '<a target="_blank" href="https://go.microsoft.com/fwlink/?LinkId=521839">Privacy &amp; Cookies</a> | '
            + '<a target="_blank" href="https://go.microsoft.com/fwlink/?linkid=2259814">Consumer Health Privacy</a> | '
            + '<a target="_blank" href="https://www.microsoft.com/en-us/legal/terms-of-use">Terms of Use</a> | '
            + '<a target="_blank" href="/conduct.html">Code of Conduct</a> | '
            + '<a target="_blank" href="https://www.microsoft.com/trademarks">Trademarks</a> | '
            + '<a>&copy; 2026 Microsoft</a></p>'
            + '<p><a target="_blank" href="https://www.microsoft.com/" aria-label="microsoft" class="microsoft"></a></p>'
            + '</div></div>';
    }

    /**
     * Initialize the full layout. Call this on every page.
     * @param {string} currentPage - e.g. 'index', 'about', 'submit', 'gallery'
     * @param {object} options - { hideNav: true } for pages like conduct
     */
    function initLayout(currentPage, options) {
        options = options || {};
        renderHeader();
        if (!options.hideNav) { renderNav(currentPage); }
        renderFooter();

        // Toggle user dropdown
        $(document).on('click', '.navbar-toggler-icon', function () {
            $('#navbarNav').toggle();
        });
        // "Please register" click handler
        $(document).on('click', '.no-login-click', function () {
            lk.alert.info('Please register first to continue browsing other pages.');
        });
    }

    /**
     * Escape HTML to prevent XSS when inserting user data.
     */
    function escHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    return {
        getHeadIncludes: getHeadIncludes,
        initLayout: initLayout,
        escHtml: escHtml,
        S: S
    };
})();

// Shortcut
var S = window.APP_CONFIG.STATIC_BASE_URL;
