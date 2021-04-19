let urljoin = require('url-join');

const URL = 'http://localhost:8080';

export const BASE = '';

export const API_BASE = urljoin(URL, 'api');

export const API_AUTH_LOGIN_URL = urljoin(API_BASE, 'auth', 'login');
export const API_AUTH_SIGNUP_URL = urljoin(API_BASE, 'auth', 'signup');
export const API_AUTH_PASSWORD_RESET_URL = urljoin(API_BASE, 'auth', 'reset-password');
export const API_AUTH_FORGOT_PASSWORD_URL= urljoin(API_BASE, 'auth', 'forgot-password');

export const API_USER_INFO_URL = urljoin(API_BASE, 'user');
export const API_USER_LIST_URL = urljoin(API_BASE, 'user', 'list');
export const API_USER_VIEW_URL= urljoin(API_BASE, 'user', 'info');
export const API_USER_EDIT_URL= urljoin(API_BASE, 'user', 'update');
export const API_USER_CREATE_URL= urljoin(API_BASE, 'user', 'create');
export const API_USER_STATUS_TOGGLE_URL= urljoin(API_BASE, 'user', 'toggle');

export const API_CLUB_LIST_URL = urljoin(API_BASE, 'club', 'list');
export const API_CLUB_INFO_URL = urljoin(API_BASE, 'club', 'info');
export const API_CLUB_CREATE_URL = urljoin(API_BASE, 'club', 'create');
export const API_CLUB_UPDATE_URL = urljoin(API_BASE, 'club', 'update');
export const API_CLUB_DELETE_URL = urljoin(API_BASE, 'club', 'delete');

export const API_CATEGORY_ALL = urljoin(API_BASE, 'category', 'all');