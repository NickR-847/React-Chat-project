export const API = "http://localhost:4000";


export const API_LOGIN = `${API}/user/login`;

export const API_SIGNUP = `${API}/user/register`;

export const API_ROOM_VIEW_ALL = `${API}/room/view-all`;

export const API_ROOM_CREATE = `${API}/room/add`;

export const API_ROOM_UPDATE = `${API}/room/update/:id`;

export const API_ROOM_DELETE = `${API}/room/delete/:id`;

export const API_MESSAGE_CREATE = `${API}/message/add/:roomId`;

export const API_MESSAGE_UPDATE = `${API}/update/:id`;

export const API_MESSAGE_DELETE = `${API}/message/delete/:id`;