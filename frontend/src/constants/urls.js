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

export const API_SC_CHAT_MESSAGE_SEND = urljoin(API_BASE, 'sub_club_chat', 'send');
export const API_SC_CHAT_VIEW_MESSAGES = urljoin(API_BASE, 'sub_club_chat', 'list');
export const API_SC_CHAT_VIEW_NEW_MESSAGES = urljoin(API_BASE, 'sub_club_chat', 'listNew');

export const API_PC_CHAT_MESSAGE_SEND = urljoin(API_BASE, 'private_message', 'send');
export const API_PC_CHAT_VIEW_MESSAGES = urljoin(API_BASE, 'private_message', 'list');
export const API_PC_CHAT_VIEW_NEW_MESSAGES = urljoin(API_BASE, 'private_message', 'listNew');
export const API_PC_CHAT_LIST_PEOPLE = urljoin(API_BASE, 'private_message', 'people');

export const API_SUB_CLUB_INFO_URL = urljoin(API_BASE, 'sub_club', 'info');

export const API_EVENT_LIST_URL = urljoin(API_BASE, 'event', 'list');
export const API_EVENT_INFO_URL = urljoin(API_BASE, 'event', 'info');
export const API_EVENT_CREATE_URL = urljoin(API_BASE, 'event', 'create');
export const API_EVENT_UPDATE_URL = urljoin(API_BASE, 'event', 'update');
export const API_EVENT_DELETE_URL = urljoin(API_BASE, 'event', 'delete');